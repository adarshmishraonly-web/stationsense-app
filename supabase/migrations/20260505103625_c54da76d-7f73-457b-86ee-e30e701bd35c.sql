
CREATE TABLE public.app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert users" ON public.app_users FOR INSERT WITH CHECK (true);
CREATE POLICY "anyone can read users by email" ON public.app_users FOR SELECT USING (true);

CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text,
  message text NOT NULL,
  rating int NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can insert feedback" ON public.feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "anyone can read feedback" ON public.feedback FOR SELECT USING (true);
