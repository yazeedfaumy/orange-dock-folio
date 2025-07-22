-- First, remove the existing user if it exists (this might have been created incorrectly)
DELETE FROM auth.users WHERE email = 'sinaan.jr@email.com';