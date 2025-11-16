-- Copy EVERYTHING below and paste into Supabase SQL Editor, then click RUN

DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE resources (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  tags TEXT[] DEFAULT '{}',
  author_name TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (TRUE);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "resources_select" ON resources FOR SELECT USING (TRUE);
CREATE POLICY "resources_insert" ON resources FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());
CREATE POLICY "resources_update" ON resources FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "resources_delete" ON resources FOR DELETE USING (auth.uid() = created_by);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
  )
  ON CONFLICT (id) DO UPDATE SET 
    name = COALESCE(NEW.raw_user_meta_data->>'name', profiles.name),
    email = NEW.email,
    avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', profiles.avatar_url),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO storage.buckets (id, name, public) VALUES ('ui-findings', 'ui-findings', true) ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "storage_select" ON storage.objects;
DROP POLICY IF EXISTS "storage_insert" ON storage.objects;
DROP POLICY IF EXISTS "storage_update" ON storage.objects;
DROP POLICY IF EXISTS "storage_delete" ON storage.objects;

CREATE POLICY "storage_select" ON storage.objects FOR SELECT USING (bucket_id = 'ui-findings');
CREATE POLICY "storage_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'ui-findings' AND auth.role() = 'authenticated');
CREATE POLICY "storage_update" ON storage.objects FOR UPDATE USING (bucket_id = 'ui-findings' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "storage_delete" ON storage.objects FOR DELETE USING (bucket_id = 'ui-findings' AND auth.uid()::text = (storage.foldername(name))[1]);

