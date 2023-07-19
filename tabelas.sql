CREATE TABLE public.users (
  id serial PRIMARY KEY,
  name varchar(150),
  email varchar(255),
  age integer,
  website varchar(255),
  introduction text,
  username varchar(100),
  password varchar(100)
);

INSERT INTO public.users (username, password)
VALUES ('gisellyrock', '123456');

