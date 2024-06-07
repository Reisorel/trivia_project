--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6 (Homebrew)
-- Dumped by pg_dump version 16.0

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
-- Data for Name: scores; Type: TABLE DATA; Schema: public; Owner: lerosier
--

COPY public.scores (id, name, score, quiz_date, rank) FROM stdin;
29	Majax le meilleur	19	2024-06-06	1
31	Danielito le malin	14	2024-06-07	2
30	Bandolin l'expert	13	2024-06-06	4
70	Oui-Oui	13	2024-06-07	3
75	Henri	10	2024-06-07	5
76	Fourier	10	2024-06-07	6
67	gogu	9	2024-06-07	7
\.


--
-- Name: scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lerosier
--

SELECT pg_catalog.setval('public.scores_id_seq', 76, true);


--
-- Name: scores scores_pkey; Type: CONSTRAINT; Schema: public; Owner: lerosier
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

