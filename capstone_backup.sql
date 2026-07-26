--
-- PostgreSQL database dump
--

\restrict rEV0neKtQ2n5zrZAvNdRnFGDyvcbdmZr2mhcU9jvH9XEU8kfejWZ6AOfdWi8OcV

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
1584	395	148	violet	\N	\N	\N	2026-07-20 03:02:03.733
1585	395	149	Yes	\N	t	\N	2026-07-20 03:02:03.733
1586	395	150	Text visibility	\N	\N	\N	2026-07-20 03:02:03.733
1587	395	151	Victoria	\N	\N	\N	2026-07-20 03:02:03.733
1588	395	152	\N	3	\N	\N	2026-07-20 03:02:03.733
1589	396	148	orange	\N	\N	\N	2026-07-20 03:02:03.741
1590	396	149	No	\N	f	\N	2026-07-20 03:02:03.741
1591	396	150	Text visibility, Image visibility	\N	\N	\N	2026-07-20 03:02:03.741
1592	396	151	Victoria	\N	\N	\N	2026-07-20 03:02:03.741
1593	396	152	\N	8	\N	\N	2026-07-20 03:02:03.741
1594	397	148	orange	\N	\N	\N	2026-07-20 03:02:03.744
1595	397	149	Yes	\N	t	\N	2026-07-20 03:02:03.744
1596	397	150	Text visibility	\N	\N	\N	2026-07-20 03:02:03.744
1597	397	151	Victoria	\N	\N	\N	2026-07-20 03:02:03.744
1598	397	152	\N	3	\N	\N	2026-07-20 03:02:03.744
1599	398	148	gold	\N	\N	\N	2026-07-20 03:02:03.746
1600	398	149	Yes	\N	t	\N	2026-07-20 03:02:03.746
1601	398	150	Text visibility, Image visibility	\N	\N	\N	2026-07-20 03:02:03.746
1602	398	151	Kelowna	\N	\N	\N	2026-07-20 03:02:03.746
1603	398	152	\N	7	\N	\N	2026-07-20 03:02:03.746
1604	399	148	indigo	\N	\N	\N	2026-07-20 03:02:03.748
1605	399	149	Yes	\N	t	\N	2026-07-20 03:02:03.748
1606	399	150	Text visibility	\N	\N	\N	2026-07-20 03:02:03.748
1607	399	151	Victoria	\N	\N	\N	2026-07-20 03:02:03.748
1608	399	152	\N	2	\N	\N	2026-07-20 03:02:03.748
1609	400	148	violet	\N	\N	\N	2026-07-20 03:02:03.749
1610	400	149	No	\N	f	\N	2026-07-20 03:02:03.749
1611	400	150	Text visibility, Image visibility	\N	\N	\N	2026-07-20 03:02:03.749
1612	400	151	Vancouver	\N	\N	\N	2026-07-20 03:02:03.749
1613	400	152	\N	6	\N	\N	2026-07-20 03:02:03.749
1614	401	148	maroon	\N	\N	\N	2026-07-20 03:02:03.751
1615	401	149	No	\N	f	\N	2026-07-20 03:02:03.751
1616	401	150	Image visibility	\N	\N	\N	2026-07-20 03:02:03.751
1617	401	151	Vancouver	\N	\N	\N	2026-07-20 03:02:03.751
1618	401	152	\N	10	\N	\N	2026-07-20 03:02:03.751
1619	402	148	indigo	\N	\N	\N	2026-07-20 03:02:03.752
1620	402	149	No	\N	f	\N	2026-07-20 03:02:03.752
1621	402	150	Image visibility, Text visibility	\N	\N	\N	2026-07-20 03:02:03.752
1622	402	151	Victoria	\N	\N	\N	2026-07-20 03:02:03.752
1623	402	152	\N	1	\N	\N	2026-07-20 03:02:03.752
1624	403	148	teal	\N	\N	\N	2026-07-20 03:02:03.752
1625	403	149	No	\N	f	\N	2026-07-20 03:02:03.752
1626	403	150	Text visibility	\N	\N	\N	2026-07-20 03:02:03.752
1627	403	151	Vancouver	\N	\N	\N	2026-07-20 03:02:03.752
1628	403	152	\N	4	\N	\N	2026-07-20 03:02:03.752
1629	404	148	green	\N	\N	\N	2026-07-20 03:02:03.753
1630	404	149	No	\N	f	\N	2026-07-20 03:02:03.753
1631	404	150	Text visibility	\N	\N	\N	2026-07-20 03:02:03.753
1632	404	151	Victoria	\N	\N	\N	2026-07-20 03:02:03.753
1633	404	152	\N	3	\N	\N	2026-07-20 03:02:03.753
1634	405	153	sky blue	\N	\N	\N	2026-07-20 03:02:03.756
1635	405	154	\N	10	\N	\N	2026-07-20 03:02:03.756
1636	405	155	Breed, None, Units, Milk Production, Milking Centre Wash Water	\N	\N	\N	2026-07-20 03:02:03.756
1637	406	153	indigo	\N	\N	\N	2026-07-20 03:02:03.758
1638	406	154	\N	6	\N	\N	2026-07-20 03:02:03.758
1639	406	155	None, Units, Milking Centre Wash Water, Milk Production, Breed	\N	\N	\N	2026-07-20 03:02:03.758
1640	407	153	gold	\N	\N	\N	2026-07-20 03:02:03.761
1641	407	154	\N	1	\N	\N	2026-07-20 03:02:03.761
1642	407	155	Units	\N	\N	\N	2026-07-20 03:02:03.761
1643	408	153	mint green	\N	\N	\N	2026-07-20 03:02:03.762
1644	408	154	\N	6	\N	\N	2026-07-20 03:02:03.762
1645	408	155	Breed, Milk Production, Milking Centre Wash Water, Units	\N	\N	\N	2026-07-20 03:02:03.762
1646	409	153	maroon	\N	\N	\N	2026-07-20 03:02:03.765
1647	409	154	\N	8	\N	\N	2026-07-20 03:02:03.765
1648	409	155	Milk Production, Milking Centre Wash Water	\N	\N	\N	2026-07-20 03:02:03.765
1649	410	153	lime	\N	\N	\N	2026-07-20 03:02:03.769
1650	410	154	\N	3	\N	\N	2026-07-20 03:02:03.769
1651	410	155	Breed, None, Milk Production, Milking Centre Wash Water, Units	\N	\N	\N	2026-07-20 03:02:03.769
1652	411	153	sky blue	\N	\N	\N	2026-07-20 03:02:03.771
1653	411	154	\N	6	\N	\N	2026-07-20 03:02:03.771
1654	411	155	Milk Production	\N	\N	\N	2026-07-20 03:02:03.771
1655	412	153	mint green	\N	\N	\N	2026-07-20 03:02:03.777
1656	412	154	\N	3	\N	\N	2026-07-20 03:02:03.777
1657	412	155	Breed, Milking Centre Wash Water	\N	\N	\N	2026-07-20 03:02:03.777
1658	413	153	olive	\N	\N	\N	2026-07-20 03:02:03.783
1659	413	154	\N	10	\N	\N	2026-07-20 03:02:03.783
1660	413	155	Units, Milking Centre Wash Water, None, Breed	\N	\N	\N	2026-07-20 03:02:03.783
1661	414	153	yellow	\N	\N	\N	2026-07-20 03:02:03.786
1662	414	154	\N	7	\N	\N	2026-07-20 03:02:03.786
1663	414	155	Milk Production	\N	\N	\N	2026-07-20 03:02:03.786
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
1	Color change form	A feedback form about the background color change button	t	1	2026-07-20 03:02:03.696	4
2	NMP Form	A form to test user's satisfaction with adding dairy cattle workflow	t	1	2026-07-20 03:02:03.709	4
\.


--
-- Data for Name: FeedbackSubmission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FeedbackSubmission" (id, "formId", submitted_at, session_id, anonymous_id, page_url, "userId", "createdAt") FROM stdin;
395	1	2026-07-19 05:20:03.285	\N	\N	\N	206	2026-07-20 03:02:03.733
396	1	2026-07-20 02:12:51.781	\N	\N	\N	206	2026-07-20 03:02:03.741
397	1	2026-07-19 06:53:32.383	\N	\N	\N	206	2026-07-20 03:02:03.744
398	1	2026-07-19 14:00:10.245	\N	\N	\N	202	2026-07-20 03:02:03.746
399	1	2026-07-19 17:20:13.65	\N	\N	\N	207	2026-07-20 03:02:03.748
400	1	2026-07-19 06:16:33.594	\N	\N	\N	207	2026-07-20 03:02:03.749
401	1	2026-07-19 05:33:40.272	\N	\N	\N	204	2026-07-20 03:02:03.751
402	1	2026-07-19 19:46:56.105	\N	\N	\N	210	2026-07-20 03:02:03.752
403	1	2026-07-19 16:40:32	\N	\N	\N	201	2026-07-20 03:02:03.752
404	1	2026-07-20 02:06:35.665	\N	\N	\N	206	2026-07-20 03:02:03.753
405	2	2026-07-20 02:13:24.446	\N	\N	\N	204	2026-07-20 03:02:03.756
406	2	2026-07-20 00:06:11.987	\N	\N	\N	204	2026-07-20 03:02:03.758
407	2	2026-07-19 13:49:08.067	\N	\N	\N	205	2026-07-20 03:02:03.761
408	2	2026-07-19 08:51:26.389	\N	\N	\N	206	2026-07-20 03:02:03.762
409	2	2026-07-19 22:01:21.598	\N	\N	\N	201	2026-07-20 03:02:03.765
410	2	2026-07-19 03:10:04.297	\N	\N	\N	208	2026-07-20 03:02:03.769
411	2	2026-07-19 19:34:39.452	\N	\N	\N	202	2026-07-20 03:02:03.771
412	2	2026-07-19 15:44:39.129	\N	\N	\N	205	2026-07-20 03:02:03.777
413	2	2026-07-19 16:12:58.965	\N	\N	\N	205	2026-07-20 03:02:03.783
414	2	2026-07-19 14:17:53.296	\N	\N	\N	210	2026-07-20 03:02:03.786
\.


--
-- Data for Name: Owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Owner" (id, email, name, "passwordHash", "createdAt") FROM stdin;
4	admin@cst.com	Admin User	$2b$10$7xDAbQKlApH5UcNdxP/SrOkIZ9Cbf1cKLKggU3TF6yf9S/BIjQm2m	2026-07-06 02:40:03.45
41	tey	tey	hashed_placeholder	2026-07-06 20:26:57.893
42	admin	\N	admin	2026-07-13 19:14:14.235
43	Admin User	\N	capstone2026	2026-07-13 19:14:23.634
\.


--
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Question" (id, "formId", question_text, is_required, display_order, metadata, "createdAt", "questionType", "defaultAnswer") FROM stdin;
148	1	What color showed up when you clicked the button?	t	1	\N	2026-07-20 03:02:03.696	TEXTAREA	\N
149	1	Does the color affect the visibility of the other content of the page?	t	2	\N	2026-07-20 03:02:03.696	RADIO	\N
150	1	If you answered 'Yes', which component does it affect most?	f	3	\N	2026-07-20 03:02:03.696	CHECKBOX	\N
151	1	City	t	3	\N	2026-07-20 03:02:03.696	DROPDOWN	\N
152	1	How happy are you with the color change?	t	5	\N	2026-07-20 03:02:03.696	SLIDER	\N
153	2	If there is a breed(s) of cattle that is not available please add it here:	f	1	\N	2026-07-20 03:02:03.709	TEXTAREA	\N
154	2	Satisfaction with workflow of adding dairy cattle?	t	2	\N	2026-07-20 03:02:03.709	SLIDER	\N
155	2	Which of the auto filled fields did you need to alter the values?	f	3	\N	2026-07-20 03:02:03.709	CHECKBOX	\N
\.


--
-- Data for Name: QuestionOption; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."QuestionOption" (id, "questionId", "optionText", "optionValue", "displayOrder", "createdAt") FROM stdin;
210	149	Yes	yes	1	2026-07-20 03:02:03.696
211	149	No	no	2	2026-07-20 03:02:03.696
212	150	Text visibility	text_visibility	1	2026-07-20 03:02:03.696
213	150	Image visibility	image_visibility	2	2026-07-20 03:02:03.696
214	151	Vancouver	vancouver	1	2026-07-20 03:02:03.696
215	151	Victoria	victoria	2	2026-07-20 03:02:03.696
216	151	Kelowna	kelowna	4	2026-07-20 03:02:03.696
217	155	None	none	1	2026-07-20 03:02:03.709
218	155	Breed	breed	2	2026-07-20 03:02:03.709
219	155	Milk Production	milk_production	3	2026-07-20 03:02:03.709
220	155	Milking Centre Wash Water	milking_centre_wash_water	4	2026-07-20 03:02:03.709
221	155	Units	units	5	2026-07-20 03:02:03.709
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, name, "createdAt") FROM stdin;
21	Jovan.Satterfield@yahoo.com	Lawrence Gleason III	2026-07-06 04:25:12.387
22	Carrie_Spinka73@gmail.com	Treva Schulist	2026-07-06 04:25:12.392
23	Euna19@gmail.com	Mr. Deron Walsh MD	2026-07-06 04:25:12.393
24	Adelia.Cummings42@hotmail.com	Buford Mayer	2026-07-06 04:25:12.394
25	Kellie16@yahoo.com	Wilfred Kuhic	2026-07-06 04:25:12.394
26	Winifred.Toy@gmail.com	Henrietta Schroeder IV	2026-07-06 04:25:12.399
27	Levi_Fisher@gmail.com	Pietro Runolfsson	2026-07-06 04:25:12.4
28	Carley79@gmail.com	Janiya Luettgen	2026-07-06 04:25:12.4
29	Shelly8@yahoo.com	Claudia Cole-Bode	2026-07-06 04:25:12.401
30	Jasen.Bashirian@yahoo.com	Marilou Schultz	2026-07-06 04:25:12.402
31	Kayli.Batz@yahoo.com	Della Howe	2026-07-06 04:31:20.969
32	Anthony1@yahoo.com	Dr. Freeman Lemke Jr.	2026-07-06 04:31:20.973
33	Gust72@gmail.com	Dwayne Kerluke	2026-07-06 04:31:20.974
34	Filiberto59@hotmail.com	Carey Russel IV	2026-07-06 04:31:20.974
35	Lila_Cartwright97@gmail.com	Gladys Grady	2026-07-06 04:31:20.975
36	Francisco.Schowalter15@hotmail.com	Harvey D'Amore	2026-07-06 04:31:20.975
37	Dorthy.Mohr2@yahoo.com	Brandy Raynor	2026-07-06 04:31:20.976
38	Alessandro57@yahoo.com	Marilyn Witting	2026-07-06 04:31:20.976
39	Malinda.McCullough@yahoo.com	Desiree Denesik	2026-07-06 04:31:20.977
40	Rashawn.Schamberger@gmail.com	Armand Koelpin	2026-07-06 04:31:20.977
41	Enrique.Marks88@gmail.com	Thora Olson	2026-07-06 16:42:12.444
42	Sarah.Cormier@gmail.com	Wilfred Wehner	2026-07-06 16:42:12.447
43	Minnie10@gmail.com	Kristin Pagac DDS	2026-07-06 16:42:12.448
44	Willy_Quitzon85@yahoo.com	Heather Orn	2026-07-06 16:42:12.449
45	Ubaldo12@yahoo.com	Pauline Reinger	2026-07-06 16:42:12.449
46	Janae.Johnson@hotmail.com	Makenna Krajcik	2026-07-06 16:42:12.45
47	Adriana80@yahoo.com	Mrs. Delfina Bosco	2026-07-06 16:42:12.45
48	Kellie12@gmail.com	Lorenza Bahringer	2026-07-06 16:42:12.451
49	Saige_Stark66@hotmail.com	Oral Wolf	2026-07-06 16:42:12.451
50	Daryl_Schiller98@gmail.com	Katheryn Fisher	2026-07-06 16:42:12.451
51	Willis_Nitzsche@gmail.com	Bradly Gleichner	2026-07-06 20:03:50.437
52	Darrion.Kshlerin22@gmail.com	Stevie Cruickshank III	2026-07-06 20:03:50.438
53	Ernie53@gmail.com	Mrs. Meggie Osinski	2026-07-06 20:03:50.438
54	Ezequiel_Cummings64@hotmail.com	Rae Kuhic	2026-07-06 20:03:50.438
55	Chloe51@gmail.com	Llewellyn Murphy	2026-07-06 20:03:50.439
56	Anibal91@hotmail.com	Dayna Lebsack	2026-07-06 20:03:50.439
57	Inez_Olson@yahoo.com	Mrs. Meghan Gutkowski	2026-07-06 20:03:50.439
58	Marta67@gmail.com	Mr. Floyd Lynch	2026-07-06 20:03:50.44
59	Kaley.Leannon@yahoo.com	Mack Nienow	2026-07-06 20:03:50.44
60	Brooklyn_Spinka@yahoo.com	Carrie Lind	2026-07-06 20:03:50.44
61	Roscoe.Lang@hotmail.com	Devin Howell-Ratke	2026-07-06 20:19:30.483
62	Kade_Jast@yahoo.com	Mr. Wilson Pagac	2026-07-06 20:19:30.488
63	Margaretta28@yahoo.com	Haleigh Reilly	2026-07-06 20:19:30.489
64	Broderick_Mills@gmail.com	Iris Wolf	2026-07-06 20:19:30.491
65	Dallas.Conn15@hotmail.com	Otilia Dickinson	2026-07-06 20:19:30.493
66	Trevor_Zboncak72@hotmail.com	Jerome Wuckert	2026-07-06 20:19:30.494
67	Crystal_Bednar91@gmail.com	Dee Corkery	2026-07-06 20:19:30.495
68	Clarence4@gmail.com	Casandra Yundt PhD	2026-07-06 20:19:30.496
69	Terrell18@gmail.com	Mrs. Jaquan Altenwerth	2026-07-06 20:19:30.497
70	Krystal_Ortiz@hotmail.com	Aubrey Haag	2026-07-06 20:19:30.498
71	Paxton84@hotmail.com	Grayce Corkery PhD	2026-07-06 20:21:47.349
72	George87@gmail.com	Rosemary Wilderman	2026-07-06 20:21:47.351
73	Zackery46@yahoo.com	Miss Gloria Bergstrom	2026-07-06 20:21:47.351
74	Ted89@hotmail.com	Gabriel Simonis PhD	2026-07-06 20:21:47.351
75	Bernie.Okuneva@yahoo.com	Meghan McGlynn	2026-07-06 20:21:47.352
76	Tyrone.Rolfson57@gmail.com	Sandy Jakubowski	2026-07-06 20:21:47.352
77	Lora.Rempel23@hotmail.com	Casandra Smith MD	2026-07-06 20:21:47.353
78	Haven.Wiegand@yahoo.com	Billie Hane	2026-07-06 20:21:47.353
79	Melvina48@yahoo.com	Kelvin Howe	2026-07-06 20:21:47.353
80	Clayton_Lind85@yahoo.com	Elwyn Swift	2026-07-06 20:21:47.354
81	Annette_Osinski38@yahoo.com	Billie Gutkowski	2026-07-09 20:12:07.1
82	Cyrus.Koch@gmail.com	Paulette Hansen DDS	2026-07-09 20:12:07.102
83	Anastasia83@gmail.com	Charles Turner-Pacocha	2026-07-09 20:12:07.103
84	Lucie.Marquardt@hotmail.com	Clint Adams	2026-07-09 20:12:07.104
85	Odie.Abshire@gmail.com	Vera Prosacco	2026-07-09 20:12:07.105
86	Rene55@hotmail.com	Wilhelm Strosin	2026-07-09 20:12:07.105
87	Sam.Parker@hotmail.com	Rita Cummings	2026-07-09 20:12:07.106
88	Anna.Kerluke49@hotmail.com	Pattie Hettinger	2026-07-09 20:12:07.106
89	Bryant.Berge72@yahoo.com	Hector Wolff	2026-07-09 20:12:07.107
90	Prince52@hotmail.com	Bobby Gibson	2026-07-09 20:12:07.107
91	Karen64@yahoo.com	Dr. Aniya Wisozk	2026-07-10 01:19:58.976
92	Kaylah_Batz67@gmail.com	Edmund Jenkins	2026-07-10 01:19:58.977
93	Madyson.Rutherford63@hotmail.com	Ms. Desmond Stokes	2026-07-10 01:19:58.978
94	Douglas_Farrell16@yahoo.com	Malcolm Gislason	2026-07-10 01:19:58.978
95	Darren.Jacobs-Ankunding45@yahoo.com	Creola Lind	2026-07-10 01:19:58.979
96	Frances.Renner@yahoo.com	Mr. Maiya Buckridge DDS	2026-07-10 01:19:58.98
97	Hector_Koch17@yahoo.com	Ona Cronin III	2026-07-10 01:19:58.98
98	Sterling_Price1@gmail.com	Fiona Oberbrunner Sr.	2026-07-10 01:19:58.98
99	Dana.Stroman23@yahoo.com	Raquel Bode	2026-07-10 01:19:58.981
100	Tina68@gmail.com	Laverne Veum	2026-07-10 01:19:58.981
101	Shannon.Abbott50@gmail.com	Antonio Wilkinson-Stehr	2026-07-12 00:13:26.48
102	Henry_Ryan@gmail.com	Sophia Terry	2026-07-12 00:13:26.482
103	Robyn.Pouros@hotmail.com	Darron Konopelski PhD	2026-07-12 00:13:26.483
104	Barbara.Osinski@hotmail.com	Gustavo Romaguera	2026-07-12 00:13:26.484
105	Blanche22@yahoo.com	Randolph Ledner	2026-07-12 00:13:26.484
106	Edgar.Abernathy-Tromp@yahoo.com	Santiago Lehner	2026-07-12 00:13:26.485
107	Moses_Beatty75@yahoo.com	Nicholas Gusikowski	2026-07-12 00:13:26.486
108	Sammy_Prosacco62@yahoo.com	Mr. Felipe Lehner	2026-07-12 00:13:26.486
109	Katharina_Kuhic97@hotmail.com	Carla King	2026-07-12 00:13:26.487
110	Madeline.Muller@hotmail.com	Fiona Nienow	2026-07-12 00:13:26.487
111	Marcelino.Moen@gmail.com	Prince Lesch	2026-07-13 16:26:07.114
112	Freddie.Kassulke31@gmail.com	Loretta Bernhard DVM	2026-07-13 16:26:07.117
113	Muhammad39@gmail.com	Alexandre Parker Sr.	2026-07-13 16:26:07.12
114	Adolph_Sauer27@gmail.com	Marianne Lakin	2026-07-13 16:26:07.122
115	Kelvin61@hotmail.com	Sibyl Swift II	2026-07-13 16:26:07.124
116	Pablo84@hotmail.com	Alize Ruecker DVM	2026-07-13 16:26:07.125
117	Roman.Koepp22@gmail.com	Myra DuBuque	2026-07-13 16:26:07.125
118	Tasha15@gmail.com	Wilhelm Hagenes	2026-07-13 16:26:07.126
119	Leif.Steuber16@yahoo.com	Santiago Corkery	2026-07-13 16:26:07.127
120	Irving80@gmail.com	Nicole Macejkovic V	2026-07-13 16:26:07.127
121	Owen.Thompson86@hotmail.com	Scott Morar	2026-07-13 16:43:43.699
122	Adolf.Konopelski@hotmail.com	Kenny Gleichner	2026-07-13 16:43:43.7
123	Justyn_Rutherford@hotmail.com	Marina Barton	2026-07-13 16:43:43.701
124	Elza_Hand12@gmail.com	Karolann Prosacco	2026-07-13 16:43:43.701
125	Clarissa83@hotmail.com	Marcel Auer	2026-07-13 16:43:43.702
126	Anais96@hotmail.com	Ebba Lowe	2026-07-13 16:43:43.702
127	Neha88@gmail.com	Rodney Stamm	2026-07-13 16:43:43.702
128	Devan37@gmail.com	Westley Trantow	2026-07-13 16:43:43.703
129	Karianne18@gmail.com	Rhiannon Botsford	2026-07-13 16:43:43.703
130	Belle.Beer97@hotmail.com	Jermain Corwin PhD	2026-07-13 16:43:43.703
131	Dallas.Larkin@gmail.com	Ellen Stracke	2026-07-13 16:46:44.98
132	Judith_Fritsch84@gmail.com	Glenda MacGyver	2026-07-13 16:46:44.982
133	Leilani.Marvin@gmail.com	Dr. Eugene Willms III	2026-07-13 16:46:44.983
134	Rhonda_Kovacek@hotmail.com	Muriel Medhurst	2026-07-13 16:46:44.983
135	Rosalee75@yahoo.com	Dewey Ebert	2026-07-13 16:46:44.984
136	Eusebio_Hintz47@yahoo.com	Randal Monahan	2026-07-13 16:46:44.985
137	Raoul.Hauck@gmail.com	Freeda Schneider	2026-07-13 16:46:44.985
138	Claire.Abbott39@hotmail.com	Margret Koelpin-Reinger	2026-07-13 16:46:44.985
139	Dessie79@hotmail.com	Laurianne Block	2026-07-13 16:46:44.986
140	Devin.Becker58@yahoo.com	Antwan Fisher-Blanda	2026-07-13 16:46:44.986
141	Leona.Pagac@hotmail.com	Dr. Leland Stroman	2026-07-13 17:37:07.391
142	Noe.Adams@hotmail.com	Ransom Koelpin	2026-07-13 17:37:07.393
143	Gregg13@hotmail.com	Myah Hilll-Orn	2026-07-13 17:37:07.393
144	Marc_Stoltenberg@yahoo.com	Alex Nitzsche	2026-07-13 17:37:07.393
145	Marsha.Dickens@hotmail.com	Ernestine Grady	2026-07-13 17:37:07.394
146	Kristina_Mohr63@hotmail.com	Jenna Maggio	2026-07-13 17:37:07.394
147	Lempi.Carter9@hotmail.com	Leo Spencer	2026-07-13 17:37:07.394
148	Wesley61@gmail.com	Bridgette Ankunding	2026-07-13 17:37:07.395
149	Halle50@yahoo.com	Georgia Haag	2026-07-13 17:37:07.395
150	Evie_Fisher@yahoo.com	Dora Sporer	2026-07-13 17:37:07.395
151	Eva_Krajcik@hotmail.com	Harvey Smitham	2026-07-13 19:13:47.366
152	Bert.Toy69@hotmail.com	Maximo Rodriguez	2026-07-13 19:13:47.367
153	Rodrigo_Hoppe@yahoo.com	Andy O'Keefe	2026-07-13 19:13:47.368
154	Katlyn15@yahoo.com	Rene Walker	2026-07-13 19:13:47.368
155	Lauriane.Batz47@yahoo.com	Kyra Turner	2026-07-13 19:13:47.369
156	Claire68@gmail.com	Steven Collins	2026-07-13 19:13:47.369
157	Everett_Wintheiser@gmail.com	Bernard D'Amore	2026-07-13 19:13:47.369
158	Karine11@hotmail.com	Mr. Roberto Williamson DDS	2026-07-13 19:13:47.37
159	Eduardo.Beahan@gmail.com	Isabel Stracke	2026-07-13 19:13:47.37
160	Opal_Swaniawski37@gmail.com	Kenneth Bergstrom	2026-07-13 19:13:47.37
161	Dock.Kemmer@hotmail.com	Ana Veum DVM	2026-07-16 04:18:38.033
162	Kaley.Lynch74@hotmail.com	Miriam Marvin	2026-07-16 04:18:38.035
163	Jackie_Auer@hotmail.com	Mabel Murphy	2026-07-16 04:18:38.036
164	Furman_Senger32@gmail.com	Cheryl Turner	2026-07-16 04:18:38.036
165	Mariana.Tromp28@hotmail.com	Glenn Thiel	2026-07-16 04:18:38.037
166	Dianna.Boyer41@gmail.com	Karley Gulgowski	2026-07-16 04:18:38.038
167	Hayley_Cremin@yahoo.com	Emerald Rau	2026-07-16 04:18:38.038
168	Anne98@yahoo.com	Dwight Schamberger	2026-07-16 04:18:38.039
169	Kari.Howell@hotmail.com	Maxie Padberg-Franecki DDS	2026-07-16 04:18:38.039
170	Osvaldo67@hotmail.com	Edd Jast	2026-07-16 04:18:38.04
171	Ian_Hoppe@hotmail.com	Kian Pacocha	2026-07-16 04:36:39.472
172	Mason32@gmail.com	Ila Barrows	2026-07-16 04:36:39.474
173	Charley16@gmail.com	Carrie Rempel-Nikolaus	2026-07-16 04:36:39.474
174	Liliane_Gottlieb55@gmail.com	Anderson Tremblay	2026-07-16 04:36:39.475
175	Minnie.Ritchie5@yahoo.com	Armando Steuber	2026-07-16 04:36:39.475
176	Walter.OHara45@gmail.com	Marvin Maggio	2026-07-16 04:36:39.476
177	Jeanette52@yahoo.com	Hattie Ziemann	2026-07-16 04:36:39.476
178	Kelly.Schoen-Nolan97@hotmail.com	Randy Schulist	2026-07-16 04:36:39.476
179	Myrna.Berge@gmail.com	Melvina Nicolas	2026-07-16 04:36:39.477
180	Jon_Torp@hotmail.com	Mr. Alfred Ritchie	2026-07-16 04:36:39.477
181	Alma.Johns31@yahoo.com	Sanford Satterfield	2026-07-16 04:40:06.803
182	Ray_Okuneva6@yahoo.com	Eduardo Emard	2026-07-16 04:40:06.804
183	Leatha21@yahoo.com	Irvin Gerhold	2026-07-16 04:40:06.805
184	Hector.Senger10@gmail.com	Mr. Gilbert Runte	2026-07-16 04:40:06.805
185	Ivan34@hotmail.com	Marjorie Williamson	2026-07-16 04:40:06.806
186	Jermaine0@hotmail.com	Cristopher Grant	2026-07-16 04:40:06.806
187	Frankie76@gmail.com	Morris Thompson	2026-07-16 04:40:06.807
188	Cecil_Purdy80@yahoo.com	Irving Johnston	2026-07-16 04:40:06.807
189	Jaquan_Murray@gmail.com	Abel Skiles	2026-07-16 04:40:06.807
190	Stewart_Sauer22@yahoo.com	Ms. Geneva Little	2026-07-16 04:40:06.807
191	Joseph.Kuhn@yahoo.com	Karen Goodwin	2026-07-16 16:39:02.261
192	Javon64@gmail.com	Raymond Cremin	2026-07-16 16:39:02.263
193	Callie.Cassin-Boyer7@hotmail.com	Linnie Blanda	2026-07-16 16:39:02.264
194	Everett10@yahoo.com	Sarah Pouros	2026-07-16 16:39:02.265
195	Betsy10@gmail.com	Adrian Leuschke	2026-07-16 16:39:02.265
196	Lucille_Konopelski@gmail.com	Roberto Kunze	2026-07-16 16:39:02.266
197	Andrea73@gmail.com	Delbert Hettinger	2026-07-16 16:39:02.267
198	Bonita_Hermiston80@yahoo.com	Mariana Osinski	2026-07-16 16:39:02.268
199	Salma.Blick21@gmail.com	Janis Lesch	2026-07-16 16:39:02.268
200	Moses34@yahoo.com	Wyman Torp Jr.	2026-07-16 16:39:02.269
201	Maribel.Dibbert34@yahoo.com	Alma Cummings	2026-07-20 03:02:03.716
202	Conner40@hotmail.com	Forrest Blanda	2026-07-20 03:02:03.721
203	Adrianna_Langworth@yahoo.com	Kristine Cassin	2026-07-20 03:02:03.723
204	Sam.Watsica6@hotmail.com	Blake Yost	2026-07-20 03:02:03.724
205	Reyes81@gmail.com	Mrs. Ana Kunde	2026-07-20 03:02:03.725
206	Charlene27@gmail.com	Tiffany Cronin	2026-07-20 03:02:03.725
207	Zoie_Jacobson30@hotmail.com	Shannon Beier-Miller	2026-07-20 03:02:03.726
208	Earnest_Wunsch@hotmail.com	Lloyd Prohaska	2026-07-20 03:02:03.726
209	Julius57@gmail.com	Christy Little	2026-07-20 03:02:03.727
210	Sadie.Glover@gmail.com	Vicki Hermiston	2026-07-20 03:02:03.728
\.


--
-- Data for Name: UserData; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserData" (id, "buttonClickCount") FROM stdin;
1	3
2	5
3	3
4	13
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
798f8e3a-4f1f-46a4-99cd-1c2920a7ef7c	1eed807d1d162f02305dd84f34d401afcde3404c503b1fb2e9238db4c14c23ba	2026-06-30 03:20:58.39168+00	20260621034913_made_developer_model	\N	\N	2026-06-30 03:20:58.390351+00	1
c0969a12-5407-4f61-83ba-8b355e91c95b	86ff441b5c0272e4d744f0ca1de0461fac6486dd5d826deb5340a277053d2ca6	2026-06-30 03:20:58.374768+00	20260525202420_add_feedback_form_schemas	\N	\N	2026-06-30 03:20:58.368257+00	1
5828433b-8e67-4620-a3ef-368f9d1c55ab	41044e9ca0b53e156916c8b06b68b2b3083c42c5d24d4915fa948b1c4d8aa1a3	2026-06-30 03:20:58.375986+00	20260526222043_add_question_type_to_question_table	\N	\N	2026-06-30 03:20:58.374986+00	1
5007fb9a-a3a8-43f5-b33c-6cd617925784	a8ac666584509abc7a77dd623c10d1fe24669f040e1e21f33e177a1da908650d	2026-06-30 03:20:58.377665+00	20260526233811_add_cascade_delete_to_question	\N	\N	2026-06-30 03:20:58.376242+00	1
6a646cd5-94ee-479e-adf1-abc298d9b722	8b92ea832686cbe2333f3ef9532c7574c8539a22dee4958127aa01a4cc0dd119	2026-06-30 03:20:58.392732+00	20260622155713_added_owner_field_to_feedback_form_table	\N	\N	2026-06-30 03:20:58.391867+00	1
8f4056d2-df2e-4968-bac0-c65064b8f682	87c17c91aead16303ae55d51b4c10bc8a3b0b23c527eb144199c20ce6f1176b0	2026-06-30 03:20:58.379362+00	20260526233951_add_cascade_delete_to_question_option	\N	\N	2026-06-30 03:20:58.378024+00	1
cfd49f35-ac0e-4e54-af28-9a97bd5ed8d7	5d37d81be24676cd10331a7f6cee683c72d208fecfe245e91a7ecfa8716127ab	2026-06-30 03:20:58.380486+00	20260601165612_changed_question_type_data_type	\N	\N	2026-06-30 03:20:58.379577+00	1
62b583ff-a644-47e7-9f20-0a32edf33feb	82e7045ac683258330cdbe0b6b04dc3f4ade9d025ee237cd8f56287f821b45ff	2026-06-30 03:20:58.382902+00	20260601174929_changed_question_type_enum	\N	\N	2026-06-30 03:20:58.380687+00	1
3931e105-b146-4c93-8e0a-e750248a7a2c	56aba44c4a0f647f1c4483bd5d9470d7e94e59d11342571cfb1c516346c00493	2026-06-30 03:20:58.39474+00	20260626184814_rename_devid_to_ownerid	\N	\N	2026-06-30 03:20:58.392909+00	1
5f325c4e-9a07-4c86-82a6-500adc18e1df	8560d3cdf4c935078542dc0364ef174f42918e8e9eaf1a969aafd5dac5f3c4e1	2026-06-30 03:20:58.384583+00	20260601180806_fixed_syntax_issue	\N	\N	2026-06-30 03:20:58.383121+00	1
c35ce7ff-b7b0-4473-bb89-da713e8fce77	656b7cc36c15d418bf605bce50c1bf8d3408aa6628c9118afc2bdfa393a6ebb9	2026-06-30 03:20:58.385763+00	20260601201738_fixed_question_type_mistake	\N	\N	2026-06-30 03:20:58.384809+00	1
acc37e66-900a-4f07-8d04-d436f0689d2e	181202ef0df7c32096a65e15db56bbcc4ed7aa6fafeb712effdc34c800f28bb1	2026-07-06 02:39:38.949998+00	20260706023424_made_name_field_unique	\N	\N	2026-07-06 02:39:38.945801+00	1
ea1ccd4a-c406-47f9-b05b-97a148047ae9	122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec	2026-06-30 03:20:58.386596+00	20260601202822_baseline_sync	\N	\N	2026-06-30 03:20:58.385968+00	1
1f9a8102-c2d2-47c6-b17b-0e212f59ca64	5a689edba4e77787b9f23ba532674dd3b755b4021678c0a6df340c72cb3a324b	2026-06-30 03:20:58.396394+00	20260626215100_removed_unnecessary_question_type	\N	\N	2026-06-30 03:20:58.394924+00	1
0368577d-d038-4539-bda8-70ecde4c1c37	4dfcaed89abc96ba59608a5407970305087009cdfe95c1e6a6133e948955df6c	2026-06-30 03:20:58.38782+00	20260606022341_add_slider_field_to_questiontype	\N	\N	2026-06-30 03:20:58.386937+00	1
8b7253ff-12d4-4be2-afd3-41f0413cc61a	bb0904d17384ced59f62b4769d08c100ee6849decb98ad80767ff04951dd61a4	2026-06-30 03:20:58.388827+00	20260606025253_add_default_answer_field_to_question_table	\N	\N	2026-06-30 03:20:58.388016+00	1
b4028ede-b98b-417f-8796-05a7233522f2	0a913c17178d1402307084b16e43927980171772a20825c209507cd171e79d35	2026-06-30 03:20:58.390147+00	20260608181647_add_user_data_model	\N	\N	2026-06-30 03:20:58.389285+00	1
9c002f6c-5d60-4108-a737-eca0ab4711c0	181202ef0df7c32096a65e15db56bbcc4ed7aa6fafeb712effdc34c800f28bb1	\N	20260706023424_made_name_field_unique	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260706023424_made_name_field_unique\n\nDatabase error code: 23505\n\nDatabase error:\nERROR: could not create unique index "Owner_name_key"\nDETAIL: Key (name)=(Admin User) is duplicated.\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E23505), message: "could not create unique index \\"Owner_name_key\\"", detail: Some("Key (name)=(Admin User) is duplicated."), hint: None, position: None, where_: None, schema: Some("public"), table: Some("Owner"), column: None, datatype: None, constraint: Some("Owner_name_key"), file: Some("tuplesortvariants.c"), line: Some(1550), routine: Some("comparetup_index_btree_tiebreak") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20260706023424_made_name_field_unique"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:113\n   1: schema_commands::commands::apply_migrations::Applying migration\n           with migration_name="20260706023424_made_name_field_unique"\n             at schema-engine/commands/src/commands/apply_migrations.rs:95\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:260	2026-07-06 02:39:29.27001+00	2026-07-06 02:34:24.179543+00	0
9988d4fa-9be7-4808-8d86-6781a4dbaa12	bdd2c2fc4965330866909065e284fe147ccb233dd03d858e9cc01b731d668ce3	\N	20260706025204_made_feedback_form_name_field_unique	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260706025204_made_feedback_form_name_field_unique\n\nDatabase error code: 23505\n\nDatabase error:\nERROR: could not create unique index "FeedbackForm_name_key"\nDETAIL: Key (name)=(Color change form) is duplicated.\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E23505), message: "could not create unique index \\"FeedbackForm_name_key\\"", detail: Some("Key (name)=(Color change form) is duplicated."), hint: None, position: None, where_: None, schema: Some("public"), table: Some("FeedbackForm"), column: None, datatype: None, constraint: Some("FeedbackForm_name_key"), file: Some("tuplesortvariants.c"), line: Some(1550), routine: Some("comparetup_index_btree_tiebreak") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20260706025204_made_feedback_form_name_field_unique"\n             at schema-engine/connectors/sql-schema-connector/src/apply_migration.rs:113\n   1: schema_commands::commands::apply_migrations::Applying migration\n           with migration_name="20260706025204_made_feedback_form_name_field_unique"\n             at schema-engine/commands/src/commands/apply_migrations.rs:95\n   2: schema_core::state::ApplyMigrations\n             at schema-engine/core/src/state.rs:260	2026-07-06 02:53:49.039752+00	2026-07-06 02:52:04.254896+00	0
21a29a2b-5894-46cf-baaf-9c85b3b09621	bdd2c2fc4965330866909065e284fe147ccb233dd03d858e9cc01b731d668ce3	2026-07-06 02:54:36.964608+00	20260706025204_made_feedback_form_name_field_unique	\N	\N	2026-07-06 02:54:36.960797+00	1
a20fd716-901d-4e96-81d1-6a3da21a13ca	c60ca47d621d108b6ab06d58bc8c8f6238ecd9498d5a72d12c545cc6c8824183	2026-07-06 17:18:26.482112+00	20260706171826_remove_unique_constrant_from_name_in_owner_table_and_made_form_id_primary_key	\N	\N	2026-07-06 17:18:26.466665+00	1
\.


--
-- Name: Answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Answer_id_seq"', 1663, true);


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

SELECT pg_catalog.setval('public."FeedbackSubmission_id_seq"', 414, true);


--
-- Name: Owner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Owner_id_seq"', 43, true);


--
-- Name: QuestionOption_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."QuestionOption_id_seq"', 221, true);


--
-- Name: Question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Question_id_seq"', 155, true);


--
-- Name: UserData_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."UserData_id_seq"', 4, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 210, true);


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

\unrestrict rEV0neKtQ2n5zrZAvNdRnFGDyvcbdmZr2mhcU9jvH9XEU8kfejWZ6AOfdWi8OcV

