--
-- PostgreSQL database dump
--

\restrict es7rvNXQ0tjTm7sRkeQTU7h8Zc0qEvIv7RF6VUngAcwA2auoKR0sS7ydLBgp43H

-- Dumped from database version 17.10 (Debian 17.10-1.pgdg13+1)
-- Dumped by pg_dump version 17.10 (Debian 17.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: QuestionType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."QuestionType" AS ENUM (
    'TEXTAREA',
    'RADIO',
    'DROPDOWN',
    'CHECKBOX',
    'SLIDER'
);


ALTER TYPE public."QuestionType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Answer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answer" (
    id integer NOT NULL,
    "submissionId" integer NOT NULL,
    "questionId" integer NOT NULL,
    "answerText" text,
    "answerNumber" double precision,
    "answerBoolean" boolean,
    "answerJson" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Answer" OWNER TO postgres;

--
-- Name: Answer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Answer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Answer_id_seq" OWNER TO postgres;

--
-- Name: Answer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Answer_id_seq" OWNED BY public."Answer".id;


--
-- Name: CoverageReport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CoverageReport" (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    coverage_percentage integer,
    coverage_picture text,
    "userId" integer,
    "ownerId" integer
);


ALTER TABLE public."CoverageReport" OWNER TO postgres;

--
-- Name: CoverageReport_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CoverageReport_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CoverageReport_id_seq" OWNER TO postgres;

--
-- Name: CoverageReport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CoverageReport_id_seq" OWNED BY public."CoverageReport".id;


--
-- Name: FeedbackForm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FeedbackForm" (
    id integer NOT NULL,
    name text,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "ownerId" integer
);


ALTER TABLE public."FeedbackForm" OWNER TO postgres;

--
-- Name: FeedbackForm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FeedbackForm_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FeedbackForm_id_seq" OWNER TO postgres;

--
-- Name: FeedbackForm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FeedbackForm_id_seq" OWNED BY public."FeedbackForm".id;


--
-- Name: FeedbackSubmission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FeedbackSubmission" (
    id integer NOT NULL,
    "formId" integer NOT NULL,
    submitted_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    session_id text,
    anonymous_id text,
    page_url text,
    "userId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."FeedbackSubmission" OWNER TO postgres;

--
-- Name: FeedbackSubmission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."FeedbackSubmission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FeedbackSubmission_id_seq" OWNER TO postgres;

--
-- Name: FeedbackSubmission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."FeedbackSubmission_id_seq" OWNED BY public."FeedbackSubmission".id;


--
-- Name: Owner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Owner" (
    id integer NOT NULL,
    email text,
    name text,
    "passwordHash" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Owner" OWNER TO postgres;

--
-- Name: Owner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Owner_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Owner_id_seq" OWNER TO postgres;

--
-- Name: Owner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Owner_id_seq" OWNED BY public."Owner".id;


--
-- Name: Question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Question" (
    id integer NOT NULL,
    "formId" integer NOT NULL,
    question_text text NOT NULL,
    is_required boolean NOT NULL,
    display_order integer NOT NULL,
    metadata jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "questionType" public."QuestionType" NOT NULL,
    "defaultAnswer" jsonb
);


ALTER TABLE public."Question" OWNER TO postgres;

--
-- Name: QuestionOption; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."QuestionOption" (
    id integer NOT NULL,
    "questionId" integer NOT NULL,
    "optionText" text NOT NULL,
    "optionValue" text NOT NULL,
    "displayOrder" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."QuestionOption" OWNER TO postgres;

--
-- Name: QuestionOption_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."QuestionOption_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."QuestionOption_id_seq" OWNER TO postgres;

--
-- Name: QuestionOption_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."QuestionOption_id_seq" OWNED BY public."QuestionOption".id;


--
-- Name: Question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Question_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Question_id_seq" OWNER TO postgres;

--
-- Name: Question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Question_id_seq" OWNED BY public."Question".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserData; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserData" (
    id integer NOT NULL,
    "buttonClickCount" integer NOT NULL
);


ALTER TABLE public."UserData" OWNER TO postgres;

--
-- Name: UserData_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."UserData_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserData_id_seq" OWNER TO postgres;

--
-- Name: UserData_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."UserData_id_seq" OWNED BY public."UserData".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Answer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer" ALTER COLUMN id SET DEFAULT nextval('public."Answer_id_seq"'::regclass);


--
-- Name: CoverageReport id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CoverageReport" ALTER COLUMN id SET DEFAULT nextval('public."CoverageReport_id_seq"'::regclass);


--
-- Name: FeedbackForm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeedbackForm" ALTER COLUMN id SET DEFAULT nextval('public."FeedbackForm_id_seq"'::regclass);


--
-- Name: FeedbackSubmission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeedbackSubmission" ALTER COLUMN id SET DEFAULT nextval('public."FeedbackSubmission_id_seq"'::regclass);


--
-- Name: Owner id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Owner" ALTER COLUMN id SET DEFAULT nextval('public."Owner_id_seq"'::regclass);


--
-- Name: Question id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question" ALTER COLUMN id SET DEFAULT nextval('public."Question_id_seq"'::regclass);


--
-- Name: QuestionOption id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionOption" ALTER COLUMN id SET DEFAULT nextval('public."QuestionOption_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserData id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserData" ALTER COLUMN id SET DEFAULT nextval('public."UserData_id_seq"'::regclass);


--
-- Data for Name: Answer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Answer" (id, "submissionId", "questionId", "answerText", "answerNumber", "answerBoolean", "answerJson", "createdAt") FROM stdin;
1	1	1	blue	\N	\N	\N	2026-07-23 03:21:50.92
2	1	2	No	\N	f	\N	2026-07-23 03:21:50.92
3	1	3	Text visibility, Image visibility	\N	\N	\N	2026-07-23 03:21:50.92
4	1	4	Kelowna	\N	\N	\N	2026-07-23 03:21:50.92
5	1	5	\N	9	\N	\N	2026-07-23 03:21:50.92
6	2	1	tan	\N	\N	\N	2026-07-23 03:21:50.937
7	2	2	Yes	\N	t	\N	2026-07-23 03:21:50.937
8	2	3	Image visibility	\N	\N	\N	2026-07-23 03:21:50.937
9	2	4	Kelowna	\N	\N	\N	2026-07-23 03:21:50.937
10	2	5	\N	7	\N	\N	2026-07-23 03:21:50.937
11	3	1	blue	\N	\N	\N	2026-07-23 03:21:50.941
12	3	2	Yes	\N	t	\N	2026-07-23 03:21:50.941
13	3	3	Image visibility	\N	\N	\N	2026-07-23 03:21:50.941
14	3	4	Victoria	\N	\N	\N	2026-07-23 03:21:50.941
15	3	5	\N	7	\N	\N	2026-07-23 03:21:50.941
16	4	1	ivory	\N	\N	\N	2026-07-23 03:21:50.945
17	4	2	Yes	\N	t	\N	2026-07-23 03:21:50.945
18	4	3	Text visibility, Image visibility	\N	\N	\N	2026-07-23 03:21:50.945
19	4	4	Vancouver	\N	\N	\N	2026-07-23 03:21:50.945
20	4	5	\N	1	\N	\N	2026-07-23 03:21:50.945
21	5	1	lime	\N	\N	\N	2026-07-23 03:21:50.947
22	5	2	No	\N	f	\N	2026-07-23 03:21:50.947
23	5	3	Image visibility, Text visibility	\N	\N	\N	2026-07-23 03:21:50.947
24	5	4	Vancouver	\N	\N	\N	2026-07-23 03:21:50.947
25	5	5	\N	1	\N	\N	2026-07-23 03:21:50.947
26	6	1	lavender	\N	\N	\N	2026-07-23 03:21:50.951
27	6	2	No	\N	f	\N	2026-07-23 03:21:50.951
28	6	3	Text visibility, Image visibility	\N	\N	\N	2026-07-23 03:21:50.951
29	6	4	Kelowna	\N	\N	\N	2026-07-23 03:21:50.951
30	6	5	\N	2	\N	\N	2026-07-23 03:21:50.951
31	7	1	green	\N	\N	\N	2026-07-23 03:21:50.955
32	7	2	Yes	\N	t	\N	2026-07-23 03:21:50.955
33	7	3	Image visibility, Text visibility	\N	\N	\N	2026-07-23 03:21:50.955
34	7	4	Vancouver	\N	\N	\N	2026-07-23 03:21:50.955
35	7	5	\N	3	\N	\N	2026-07-23 03:21:50.955
36	8	1	mint green	\N	\N	\N	2026-07-23 03:21:50.957
37	8	2	No	\N	f	\N	2026-07-23 03:21:50.957
38	8	3	Text visibility	\N	\N	\N	2026-07-23 03:21:50.957
39	8	4	Vancouver	\N	\N	\N	2026-07-23 03:21:50.957
40	8	5	\N	9	\N	\N	2026-07-23 03:21:50.957
41	9	1	magenta	\N	\N	\N	2026-07-23 03:21:50.964
42	9	2	Yes	\N	t	\N	2026-07-23 03:21:50.964
43	9	3	Image visibility	\N	\N	\N	2026-07-23 03:21:50.964
44	9	4	Kelowna	\N	\N	\N	2026-07-23 03:21:50.964
45	9	5	\N	7	\N	\N	2026-07-23 03:21:50.964
46	10	1	blue	\N	\N	\N	2026-07-23 03:21:50.968
47	10	2	No	\N	f	\N	2026-07-23 03:21:50.968
48	10	3	Image visibility, Text visibility	\N	\N	\N	2026-07-23 03:21:50.968
49	10	4	Victoria	\N	\N	\N	2026-07-23 03:21:50.968
50	10	5	\N	3	\N	\N	2026-07-23 03:21:50.968
51	11	6	tan	\N	\N	\N	2026-07-23 03:21:50.973
52	11	7	\N	7	\N	\N	2026-07-23 03:21:50.973
53	11	8	None, Units, Milking Centre Wash Water, Breed, Milk Production	\N	\N	\N	2026-07-23 03:21:50.973
54	12	6	orchid	\N	\N	\N	2026-07-23 03:21:50.978
55	12	7	\N	10	\N	\N	2026-07-23 03:21:50.978
56	12	8	None, Milk Production	\N	\N	\N	2026-07-23 03:21:50.978
57	13	6	azure	\N	\N	\N	2026-07-23 03:21:50.982
58	13	7	\N	8	\N	\N	2026-07-23 03:21:50.982
59	13	8	Breed, Milking Centre Wash Water, Units	\N	\N	\N	2026-07-23 03:21:50.982
60	14	6	blue	\N	\N	\N	2026-07-23 03:21:50.988
61	14	7	\N	4	\N	\N	2026-07-23 03:21:50.988
62	14	8	Milk Production	\N	\N	\N	2026-07-23 03:21:50.988
63	15	6	turquoise	\N	\N	\N	2026-07-23 03:21:50.994
64	15	7	\N	9	\N	\N	2026-07-23 03:21:50.994
65	15	8	Milking Centre Wash Water	\N	\N	\N	2026-07-23 03:21:50.994
66	16	6	red	\N	\N	\N	2026-07-23 03:21:50.999
67	16	7	\N	5	\N	\N	2026-07-23 03:21:50.999
68	16	8	Units, Milk Production, None	\N	\N	\N	2026-07-23 03:21:50.999
69	17	6	maroon	\N	\N	\N	2026-07-23 03:21:51.003
70	17	7	\N	5	\N	\N	2026-07-23 03:21:51.003
71	17	8	Units, None, Breed	\N	\N	\N	2026-07-23 03:21:51.003
72	18	6	teal	\N	\N	\N	2026-07-23 03:21:51.008
73	18	7	\N	6	\N	\N	2026-07-23 03:21:51.008
74	18	8	Milk Production, Milking Centre Wash Water	\N	\N	\N	2026-07-23 03:21:51.008
75	19	6	purple	\N	\N	\N	2026-07-23 03:21:51.01
76	19	7	\N	8	\N	\N	2026-07-23 03:21:51.01
77	19	8	Breed	\N	\N	\N	2026-07-23 03:21:51.01
78	20	6	orange	\N	\N	\N	2026-07-23 03:21:51.014
79	20	7	\N	3	\N	\N	2026-07-23 03:21:51.014
80	20	8	Milking Centre Wash Water, Milk Production, None, Breed	\N	\N	\N	2026-07-23 03:21:51.014
\.


--
-- Data for Name: CoverageReport; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CoverageReport" (id, "createdAt", coverage_percentage, coverage_picture, "userId", "ownerId") FROM stdin;
\.


--
-- Data for Name: FeedbackForm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FeedbackForm" (id, name, description, is_active, version, "createdAt", "ownerId") FROM stdin;
1	Color change form	A feedback form about the background color change button	t	1	2026-07-23 03:21:50.777	1
2	NMP Form	A form to test user's satisfaction with adding dairy cattle workflow	t	1	2026-07-23 03:21:50.858	1
\.


--
-- Data for Name: FeedbackSubmission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FeedbackSubmission" (id, "formId", submitted_at, session_id, anonymous_id, page_url, "userId", "createdAt") FROM stdin;
1	1	2026-07-22 11:10:05.906	\N	\N	\N	6	2026-07-23 03:21:50.92
2	1	2026-07-22 10:22:25.62	\N	\N	\N	9	2026-07-23 03:21:50.937
3	1	2026-07-22 12:54:12.779	\N	\N	\N	3	2026-07-23 03:21:50.941
4	1	2026-07-22 21:47:09.146	\N	\N	\N	9	2026-07-23 03:21:50.945
5	1	2026-07-22 14:11:37.817	\N	\N	\N	9	2026-07-23 03:21:50.947
6	1	2026-07-22 20:59:47.52	\N	\N	\N	3	2026-07-23 03:21:50.951
7	1	2026-07-22 03:55:18.496	\N	\N	\N	5	2026-07-23 03:21:50.955
8	1	2026-07-22 05:34:37.616	\N	\N	\N	10	2026-07-23 03:21:50.957
9	1	2026-07-23 00:42:37.108	\N	\N	\N	6	2026-07-23 03:21:50.964
10	1	2026-07-22 23:32:10.197	\N	\N	\N	10	2026-07-23 03:21:50.968
11	2	2026-07-22 18:41:55.786	\N	\N	\N	2	2026-07-23 03:21:50.973
12	2	2026-07-23 00:39:23.823	\N	\N	\N	6	2026-07-23 03:21:50.978
13	2	2026-07-22 21:22:48.114	\N	\N	\N	1	2026-07-23 03:21:50.982
14	2	2026-07-23 01:54:13.297	\N	\N	\N	7	2026-07-23 03:21:50.988
15	2	2026-07-22 20:37:36.097	\N	\N	\N	4	2026-07-23 03:21:50.994
16	2	2026-07-22 03:57:30.271	\N	\N	\N	1	2026-07-23 03:21:50.999
17	2	2026-07-22 12:11:36.509	\N	\N	\N	6	2026-07-23 03:21:51.003
18	2	2026-07-22 05:26:39.263	\N	\N	\N	6	2026-07-23 03:21:51.008
19	2	2026-07-22 05:55:12.082	\N	\N	\N	10	2026-07-23 03:21:51.01
20	2	2026-07-22 04:28:27.384	\N	\N	\N	3	2026-07-23 03:21:51.014
\.


--
-- Data for Name: Owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Owner" (id, email, name, "passwordHash", "createdAt") FROM stdin;
1	admin@cst.com	Admin User	$2b$10$HOLH.8IiY8L6h/QzMbjsWuEynYFi8b8klkp7lgnpKhB0G2jAeFx.G	2026-07-23 03:21:50.752
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Question" (id, "formId", question_text, is_required, display_order, metadata, "createdAt", "questionType", "defaultAnswer") FROM stdin;
1	1	What color showed up when you clicked the button?	t	1	\N	2026-07-23 03:21:50.777	TEXTAREA	\N
2	1	Does the color affect the visibility of the other content of the page?	t	2	\N	2026-07-23 03:21:50.777	RADIO	\N
3	1	If you answered 'Yes', which component does it affect most?	f	3	\N	2026-07-23 03:21:50.777	CHECKBOX	\N
4	1	City	t	3	\N	2026-07-23 03:21:50.777	DROPDOWN	\N
5	1	How happy are you with the color change?	t	5	\N	2026-07-23 03:21:50.777	SLIDER	\N
6	2	If there is a breed(s) of cattle that is not available please add it here:	f	1	\N	2026-07-23 03:21:50.858	TEXTAREA	\N
7	2	Satisfaction with workflow of adding dairy cattle?	t	2	\N	2026-07-23 03:21:50.858	SLIDER	\N
8	2	Which of the auto filled fields did you need to alter the values?	f	3	\N	2026-07-23 03:21:50.858	CHECKBOX	\N
\.


--
-- Data for Name: QuestionOption; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."QuestionOption" (id, "questionId", "optionText", "optionValue", "displayOrder", "createdAt") FROM stdin;
1	2	Yes	yes	1	2026-07-23 03:21:50.777
2	2	No	no	2	2026-07-23 03:21:50.777
3	3	Text visibility	text_visibility	1	2026-07-23 03:21:50.777
4	3	Image visibility	image_visibility	2	2026-07-23 03:21:50.777
5	4	Vancouver	vancouver	1	2026-07-23 03:21:50.777
6	4	Victoria	victoria	2	2026-07-23 03:21:50.777
7	4	Kelowna	kelowna	4	2026-07-23 03:21:50.777
8	8	None	none	1	2026-07-23 03:21:50.858
9	8	Breed	breed	2	2026-07-23 03:21:50.858
10	8	Milk Production	milk_production	3	2026-07-23 03:21:50.858
11	8	Milking Centre Wash Water	milking_centre_wash_water	4	2026-07-23 03:21:50.858
12	8	Units	units	5	2026-07-23 03:21:50.858
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, name, "createdAt") FROM stdin;
1	Elna61@gmail.com	Pietro Mitchell	2026-07-23 03:21:50.866
2	Kyla_Barrows91@hotmail.com	Herminia Lehner-Hane	2026-07-23 03:21:50.889
3	Luis.Powlowski@hotmail.com	Leonora Quigley	2026-07-23 03:21:50.893
4	Davon_Marvin@gmail.com	Garrett Herzog	2026-07-23 03:21:50.898
5	Lora_Kautzer@hotmail.com	Francisca Daugherty	2026-07-23 03:21:50.901
6	Helene_Pollich@hotmail.com	Madyson Mueller	2026-07-23 03:21:50.904
7	Tevin76@yahoo.com	Hazel Waelchi	2026-07-23 03:21:50.908
8	Heather.Konopelski@gmail.com	Cathy Cremin	2026-07-23 03:21:50.911
9	Taylor.Kuhlman9@hotmail.com	Matthew Dare	2026-07-23 03:21:50.913
10	Minerva_Stracke-Prohaska77@gmail.com	Theresa Moore	2026-07-23 03:21:50.915
\.


--
-- Data for Name: UserData; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserData" (id, "buttonClickCount") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
056c7752-3f4e-4411-b366-1f5df9376594	1eed807d1d162f02305dd84f34d401afcde3404c503b1fb2e9238db4c14c23ba	2026-07-20 21:44:55.768961+00	20260621034913_made_developer_model	\N	\N	2026-07-20 21:44:55.699727+00	1
eb973193-0785-4a08-b8b8-3e7701173aa5	86ff441b5c0272e4d744f0ca1de0461fac6486dd5d826deb5340a277053d2ca6	2026-07-20 21:44:55.576969+00	20260525202420_add_feedback_form_schemas	\N	\N	2026-07-20 21:44:55.249921+00	1
32271552-644b-41fe-b1a1-71b4038f78ca	41044e9ca0b53e156916c8b06b68b2b3083c42c5d24d4915fa948b1c4d8aa1a3	2026-07-20 21:44:55.579478+00	20260526222043_add_question_type_to_question_table	\N	\N	2026-07-20 21:44:55.577519+00	1
2930dfcb-cc14-452c-9c09-de0f89f9320a	a8ac666584509abc7a77dd623c10d1fe24669f040e1e21f33e177a1da908650d	2026-07-20 21:44:55.584025+00	20260526233811_add_cascade_delete_to_question	\N	\N	2026-07-20 21:44:55.579928+00	1
9a8a642f-b87b-4711-b4df-35917294ea17	8b92ea832686cbe2333f3ef9532c7574c8539a22dee4958127aa01a4cc0dd119	2026-07-20 21:44:55.773554+00	20260622155713_added_owner_field_to_feedback_form_table	\N	\N	2026-07-20 21:44:55.769477+00	1
fc12451f-9db1-48cb-94cb-95c6fd2e3d91	87c17c91aead16303ae55d51b4c10bc8a3b0b23c527eb144199c20ce6f1176b0	2026-07-20 21:44:55.649327+00	20260526233951_add_cascade_delete_to_question_option	\N	\N	2026-07-20 21:44:55.584783+00	1
170f8564-f70a-4ed3-b274-555901527433	5d37d81be24676cd10331a7f6cee683c72d208fecfe245e91a7ecfa8716127ab	2026-07-20 21:44:55.652962+00	20260601165612_changed_question_type_data_type	\N	\N	2026-07-20 21:44:55.650646+00	1
0aa40de0-3e9c-4c84-a7ae-d1163679053d	82e7045ac683258330cdbe0b6b04dc3f4ade9d025ee237cd8f56287f821b45ff	2026-07-20 21:44:55.673258+00	20260601174929_changed_question_type_enum	\N	\N	2026-07-20 21:44:55.653569+00	1
f7ed2b9b-e620-42dc-86c1-664cdfa04568	56aba44c4a0f647f1c4483bd5d9470d7e94e59d11342571cfb1c516346c00493	2026-07-20 21:44:55.790163+00	20260626184814_rename_devid_to_ownerid	\N	\N	2026-07-20 21:44:55.774274+00	1
a8b9c757-a469-4927-8bc7-c506f5df45a0	8560d3cdf4c935078542dc0364ef174f42918e8e9eaf1a969aafd5dac5f3c4e1	2026-07-20 21:44:55.683969+00	20260601180806_fixed_syntax_issue	\N	\N	2026-07-20 21:44:55.673757+00	1
eaad18ea-1bdb-4fcf-971d-fdbe1a5dd332	656b7cc36c15d418bf605bce50c1bf8d3408aa6628c9118afc2bdfa393a6ebb9	2026-07-20 21:44:55.686558+00	20260601201738_fixed_question_type_mistake	\N	\N	2026-07-20 21:44:55.684425+00	1
389f33b4-6242-4994-aba3-cd97b5adb0a4	122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec	2026-07-20 21:44:55.688379+00	20260601202822_baseline_sync	\N	\N	2026-07-20 21:44:55.687081+00	1
edd86cb5-a353-42bc-925e-634c956a7241	5a689edba4e77787b9f23ba532674dd3b755b4021678c0a6df340c72cb3a324b	2026-07-20 21:44:55.80077+00	20260626215100_removed_unnecessary_question_type	\N	\N	2026-07-20 21:44:55.790846+00	1
867b124c-26ac-4002-8e8c-0d60bdb6d7f8	4dfcaed89abc96ba59608a5407970305087009cdfe95c1e6a6133e948955df6c	2026-07-20 21:44:55.690521+00	20260606022341_add_slider_field_to_questiontype	\N	\N	2026-07-20 21:44:55.68887+00	1
04851e60-0e32-4705-9cd2-9291f57f6478	bb0904d17384ced59f62b4769d08c100ee6849decb98ad80767ff04951dd61a4	2026-07-20 21:44:55.692637+00	20260606025253_add_default_answer_field_to_question_table	\N	\N	2026-07-20 21:44:55.690969+00	1
111fae80-106a-4af9-8b40-476670d3bbca	0a913c17178d1402307084b16e43927980171772a20825c209507cd171e79d35	2026-07-20 21:44:55.69921+00	20260608181647_add_user_data_model	\N	\N	2026-07-20 21:44:55.693149+00	1
ae671c18-205b-4f10-803e-62b3e9212d92	181202ef0df7c32096a65e15db56bbcc4ed7aa6fafeb712effdc34c800f28bb1	2026-07-20 21:44:55.850508+00	20260706023424_made_name_field_unique	\N	\N	2026-07-20 21:44:55.801262+00	1
a194eef0-8138-44da-8551-23e8cf212899	bdd2c2fc4965330866909065e284fe147ccb233dd03d858e9cc01b731d668ce3	2026-07-20 21:44:55.854345+00	20260706025204_made_feedback_form_name_field_unique	\N	\N	2026-07-20 21:44:55.851135+00	1
c1ea0645-2349-40a8-9f9f-fa5f0a776dc5	c60ca47d621d108b6ab06d58bc8c8f6238ecd9498d5a72d12c545cc6c8824183	2026-07-20 21:44:55.860885+00	20260706171826_remove_unique_constrant_from_name_in_owner_table_and_made_form_id_primary_key	\N	\N	2026-07-20 21:44:55.854835+00	1
\.


--
-- Name: Answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Answer_id_seq"', 80, true);


--
-- Name: CoverageReport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CoverageReport_id_seq"', 1, false);


--
-- Name: FeedbackForm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FeedbackForm_id_seq"', 2, true);


--
-- Name: FeedbackSubmission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."FeedbackSubmission_id_seq"', 20, true);


--
-- Name: Owner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Owner_id_seq"', 1, true);


--
-- Name: QuestionOption_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."QuestionOption_id_seq"', 12, true);


--
-- Name: Question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Question_id_seq"', 8, true);


--
-- Name: UserData_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserData_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 10, true);


--
-- Name: Answer Answer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id);


--
-- Name: CoverageReport CoverageReport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CoverageReport"
    ADD CONSTRAINT "CoverageReport_pkey" PRIMARY KEY (id);


--
-- Name: FeedbackForm FeedbackForm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeedbackForm"
    ADD CONSTRAINT "FeedbackForm_pkey" PRIMARY KEY (id);


--
-- Name: FeedbackSubmission FeedbackSubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeedbackSubmission"
    ADD CONSTRAINT "FeedbackSubmission_pkey" PRIMARY KEY (id);


--
-- Name: Owner Owner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Owner"
    ADD CONSTRAINT "Owner_pkey" PRIMARY KEY (id);


--
-- Name: QuestionOption QuestionOption_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionOption"
    ADD CONSTRAINT "QuestionOption_pkey" PRIMARY KEY (id);


--
-- Name: Question Question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id);


--
-- Name: UserData UserData_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserData"
    ADD CONSTRAINT "UserData_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: FeedbackForm_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "FeedbackForm_id_key" ON public."FeedbackForm" USING btree (id);


--
-- Name: Owner_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Owner_email_key" ON public."Owner" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Answer Answer_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Answer Answer_submissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES public."FeedbackSubmission"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CoverageReport CoverageReport_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CoverageReport"
    ADD CONSTRAINT "CoverageReport_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Owner"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: CoverageReport CoverageReport_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CoverageReport"
    ADD CONSTRAINT "CoverageReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FeedbackForm FeedbackForm_ownerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeedbackForm"
    ADD CONSTRAINT "FeedbackForm_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES public."Owner"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: FeedbackSubmission FeedbackSubmission_formId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeedbackSubmission"
    ADD CONSTRAINT "FeedbackSubmission_formId_fkey" FOREIGN KEY ("formId") REFERENCES public."FeedbackForm"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: FeedbackSubmission FeedbackSubmission_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FeedbackSubmission"
    ADD CONSTRAINT "FeedbackSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: QuestionOption QuestionOption_questionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QuestionOption"
    ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES public."Question"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Question Question_formId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES public."FeedbackForm"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict es7rvNXQ0tjTm7sRkeQTU7h8Zc0qEvIv7RF6VUngAcwA2auoKR0sS7ydLBgp43H

