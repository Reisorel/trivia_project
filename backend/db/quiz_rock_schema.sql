--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Homebrew)
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: scores; Type: TABLE; Schema: public; Owner: lerosier
--

CREATE TABLE public.scores (
    id integer NOT NULL,
    name character varying(100),
    score integer,
    quiz_date date,
    rank integer
);


ALTER TABLE public.scores OWNER TO lerosier;

--
-- Name: scores_id_seq; Type: SEQUENCE; Schema: public; Owner: lerosier
--

CREATE SEQUENCE public.scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scores_id_seq OWNER TO lerosier;

--
-- Name: scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lerosier
--

ALTER SEQUENCE public.scores_id_seq OWNED BY public.scores.id;


--
-- Name: scores id; Type: DEFAULT; Schema: public; Owner: lerosier
--

ALTER TABLE ONLY public.scores ALTER COLUMN id SET DEFAULT nextval('public.scores_id_seq'::regclass);


--
-- Name: scores scores_pkey; Type: CONSTRAINT; Schema: public; Owner: lerosier
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

