-- ====================================================================
-- VILA DO SABER (FIRE RED RPG EDITION)
-- Supabase Schema: Tabela de Perfis e Progresso em Nuvem das Irmãs
-- ====================================================================

-- 1. Criação da tabela de perfis das jogadoras (Cecília e Bianca)
CREATE TABLE IF NOT EXISTS public.rpg_profiles (
  id TEXT PRIMARY KEY,                       -- 'cecilia' ou 'bianca'
  player_name TEXT NOT NULL,                 -- 'Cecília' ou 'Bianca'
  year INT NOT NULL,                         -- 4 (Cecília) ou 2 (Bianca)
  pin TEXT NOT NULL DEFAULT '1234',          -- Senha/PIN de 4 dígitos para login
  x INT NOT NULL DEFAULT 20,                 -- Posição X exata no mapa (tile)
  y INT NOT NULL DEFAULT 29,                 -- Posição Y exata no mapa (tile)
  direction TEXT NOT NULL DEFAULT 'up',      -- Orientação ('up', 'down', 'left', 'right')
  current_zone TEXT NOT NULL DEFAULT 'Vila da Família', -- Região atual do mapa
  coins INT NOT NULL DEFAULT 180,            -- Saldo de moedas
  xp INT NOT NULL DEFAULT 420,               -- Pontos de experiência geral
  inventory JSONB NOT NULL DEFAULT '{}'::jsonb,         -- Bolsa (pokébolas, poções, pedras)
  pokemon_list JSONB NOT NULL DEFAULT '[]'::jsonb,      -- Equipe de Pokémon (HP, energia, nível)
  stolen_pokemon_list JSONB NOT NULL DEFAULT '[]'::jsonb, -- Pokémon confiscados pela Rocket
  unlocked_routes JSONB NOT NULL DEFAULT '{}'::jsonb,   -- Rotas e ginásios liberados
  explorer_skills JSONB NOT NULL DEFAULT '{}'::jsonb,   -- Habilidades (Surf, Cut, Flash, Smash)
  gym_badges JSONB NOT NULL DEFAULT '{}'::jsonb,        -- Insígnias conquistadas
  customization JSONB NOT NULL DEFAULT '{}'::jsonb,     -- Cabelo, roupas e acessórios
  unlocked_wardrobe_items JSONB NOT NULL DEFAULT '[]'::jsonb, -- Guarda-roupa desbloqueado
  active_quest JSONB DEFAULT NULL,                      -- Missão atual (Papai Carlos/Mamãe Renata)
  phone_messages JSONB NOT NULL DEFAULT '[]'::jsonb,    -- Histórico do PokéCelular
  rival_config JSONB DEFAULT NULL,                      -- Rival Gary e batalhas
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Habilitação de RLS (Row Level Security) com política de acesso para anon/autenticado
ALTER TABLE public.rpg_profiles ENABLE ROW LEVEL SECURITY;

-- Política permissiva para o app Vila do Saber (jogatina em tablets escolares da família)
DROP POLICY IF EXISTS "Permitir leitura para anon e authenticated" ON public.rpg_profiles;
CREATE POLICY "Permitir leitura para anon e authenticated"
  ON public.rpg_profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Permitir inserção e atualização para anon e authenticated" ON public.rpg_profiles;
CREATE POLICY "Permitir inserção e atualização para anon e authenticated"
  ON public.rpg_profiles FOR ALL
  USING (true)
  WITH CHECK (true);

-- 3. Inserção dos dois perfis padrão (se ainda não existirem)
INSERT INTO public.rpg_profiles (id, player_name, year, pin, x, y, direction, current_zone, coins, xp)
VALUES 
  ('cecilia', 'Cecília', 4, '4444', 20, 29, 'up', 'Vila da Família', 180, 420),
  ('bianca', 'Bianca', 2, '2222', 20, 29, 'up', 'Vila da Família', 180, 420)
ON CONFLICT (id) DO NOTHING;

-- 4. Gatilho automático para atualizar o campo updated_at
CREATE OR REPLACE FUNCTION public.handle_rpg_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_rpg_profiles_updated_at ON public.rpg_profiles;
CREATE TRIGGER trigger_rpg_profiles_updated_at
  BEFORE UPDATE ON public.rpg_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_rpg_updated_at();

-- Pronto! A tabela rpg_profiles está configurada e pronta para persistência em nuvem.
