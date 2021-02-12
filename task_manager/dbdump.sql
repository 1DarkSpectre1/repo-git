--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

-- Started on 2021-02-12 15:38:23

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

--
-- TOC entry 6 (class 2615 OID 26115)
-- Name: task_manager; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA task_manager;


ALTER SCHEMA task_manager OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 26142)
-- Name: ref_positions; Type: TABLE; Schema: task_manager; Owner: postgres
--

CREATE TABLE task_manager.ref_positions (
    pk_id integer NOT NULL,
    c_name character varying(50) NOT NULL
);


ALTER TABLE task_manager.ref_positions OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 26140)
-- Name: ref_positions_pk_id_seq; Type: SEQUENCE; Schema: task_manager; Owner: postgres
--

CREATE SEQUENCE task_manager.ref_positions_pk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE task_manager.ref_positions_pk_id_seq OWNER TO postgres;

--
-- TOC entry 2900 (class 0 OID 0)
-- Dependencies: 209
-- Name: ref_positions_pk_id_seq; Type: SEQUENCE OWNED BY; Schema: task_manager; Owner: postgres
--

ALTER SEQUENCE task_manager.ref_positions_pk_id_seq OWNED BY task_manager.ref_positions.pk_id;


--
-- TOC entry 206 (class 1259 OID 26126)
-- Name: ref_statuses; Type: TABLE; Schema: task_manager; Owner: postgres
--

CREATE TABLE task_manager.ref_statuses (
    pk_id integer NOT NULL,
    c_name character varying(50) NOT NULL
);


ALTER TABLE task_manager.ref_statuses OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 26134)
-- Name: t_employees; Type: TABLE; Schema: task_manager; Owner: postgres
--

CREATE TABLE task_manager.t_employees (
    pk_id integer NOT NULL,
    fk_position integer NOT NULL,
    c_lastname character varying(50) NOT NULL,
    c_firstname character varying(50) NOT NULL,
    c_middlename character varying(50),
    c_phone_number character varying(50),
    c_email character varying(50),
    is_archive integer
);


ALTER TABLE task_manager.t_employees OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 26132)
-- Name: t_employees_pk_id_seq; Type: SEQUENCE; Schema: task_manager; Owner: postgres
--

CREATE SEQUENCE task_manager.t_employees_pk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE task_manager.t_employees_pk_id_seq OWNER TO postgres;

--
-- TOC entry 2901 (class 0 OID 0)
-- Dependencies: 207
-- Name: t_employees_pk_id_seq; Type: SEQUENCE OWNED BY; Schema: task_manager; Owner: postgres
--

ALTER SEQUENCE task_manager.t_employees_pk_id_seq OWNED BY task_manager.t_employees.pk_id;


--
-- TOC entry 214 (class 1259 OID 26158)
-- Name: t_progects; Type: TABLE; Schema: task_manager; Owner: postgres
--

CREATE TABLE task_manager.t_progects (
    pk_id integer NOT NULL,
    c_name character varying(50) NOT NULL,
    c_description character varying(100) NOT NULL,
    fk_employee integer NOT NULL,
    is_archive integer
);


ALTER TABLE task_manager.t_progects OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 26156)
-- Name: t_projects_pk_id_seq; Type: SEQUENCE; Schema: task_manager; Owner: postgres
--

CREATE SEQUENCE task_manager.t_projects_pk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE task_manager.t_projects_pk_id_seq OWNER TO postgres;

--
-- TOC entry 2902 (class 0 OID 0)
-- Dependencies: 213
-- Name: t_projects_pk_id_seq; Type: SEQUENCE OWNED BY; Schema: task_manager; Owner: postgres
--

ALTER SEQUENCE task_manager.t_projects_pk_id_seq OWNED BY task_manager.t_progects.pk_id;


--
-- TOC entry 205 (class 1259 OID 26124)
-- Name: t_status_pk_id_seq; Type: SEQUENCE; Schema: task_manager; Owner: postgres
--

CREATE SEQUENCE task_manager.t_status_pk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE task_manager.t_status_pk_id_seq OWNER TO postgres;

--
-- TOC entry 2903 (class 0 OID 0)
-- Dependencies: 205
-- Name: t_status_pk_id_seq; Type: SEQUENCE OWNED BY; Schema: task_manager; Owner: postgres
--

ALTER SEQUENCE task_manager.t_status_pk_id_seq OWNED BY task_manager.ref_statuses.pk_id;


--
-- TOC entry 204 (class 1259 OID 26118)
-- Name: t_tasks; Type: TABLE; Schema: task_manager; Owner: postgres
--

CREATE TABLE task_manager.t_tasks (
    pk_id integer NOT NULL,
    c_name character varying(100) NOT NULL,
    c_sch_hours real,
    c_fact_hours real,
    fk_status integer NOT NULL,
    fk_progect integer NOT NULL,
    fk_employee integer,
    c_description text,
    is_archive integer
);


ALTER TABLE task_manager.t_tasks OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 26116)
-- Name: t_tasks_pk_id_seq; Type: SEQUENCE; Schema: task_manager; Owner: postgres
--

CREATE SEQUENCE task_manager.t_tasks_pk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE task_manager.t_tasks_pk_id_seq OWNER TO postgres;

--
-- TOC entry 2904 (class 0 OID 0)
-- Dependencies: 203
-- Name: t_tasks_pk_id_seq; Type: SEQUENCE OWNED BY; Schema: task_manager; Owner: postgres
--

ALTER SEQUENCE task_manager.t_tasks_pk_id_seq OWNED BY task_manager.t_tasks.pk_id;


--
-- TOC entry 212 (class 1259 OID 26150)
-- Name: t_users; Type: TABLE; Schema: task_manager; Owner: postgres
--

CREATE TABLE task_manager.t_users (
    pk_id integer NOT NULL,
    c_login character varying(50) NOT NULL,
    fk_employee integer NOT NULL,
    c_password character varying(50)
);


ALTER TABLE task_manager.t_users OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 26148)
-- Name: t_users_pk_id_seq; Type: SEQUENCE; Schema: task_manager; Owner: postgres
--

CREATE SEQUENCE task_manager.t_users_pk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE task_manager.t_users_pk_id_seq OWNER TO postgres;

--
-- TOC entry 2905 (class 0 OID 0)
-- Dependencies: 211
-- Name: t_users_pk_id_seq; Type: SEQUENCE OWNED BY; Schema: task_manager; Owner: postgres
--

ALTER SEQUENCE task_manager.t_users_pk_id_seq OWNED BY task_manager.t_users.pk_id;


--
-- TOC entry 216 (class 1259 OID 26166)
-- Name: toc_emploees_projects; Type: TABLE; Schema: task_manager; Owner: postgres
--

CREATE TABLE task_manager.toc_emploees_projects (
    pk_id integer NOT NULL,
    fk_progects integer NOT NULL,
    fk_employees integer NOT NULL
);


ALTER TABLE task_manager.toc_emploees_projects OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 26164)
-- Name: toc_emploees_projects_pk_id_seq; Type: SEQUENCE; Schema: task_manager; Owner: postgres
--

CREATE SEQUENCE task_manager.toc_emploees_projects_pk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE task_manager.toc_emploees_projects_pk_id_seq OWNER TO postgres;

--
-- TOC entry 2906 (class 0 OID 0)
-- Dependencies: 215
-- Name: toc_emploees_projects_pk_id_seq; Type: SEQUENCE OWNED BY; Schema: task_manager; Owner: postgres
--

ALTER SEQUENCE task_manager.toc_emploees_projects_pk_id_seq OWNED BY task_manager.toc_emploees_projects.pk_id;


--
-- TOC entry 2729 (class 2604 OID 26145)
-- Name: ref_positions pk_id; Type: DEFAULT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.ref_positions ALTER COLUMN pk_id SET DEFAULT nextval('task_manager.ref_positions_pk_id_seq'::regclass);


--
-- TOC entry 2727 (class 2604 OID 26129)
-- Name: ref_statuses pk_id; Type: DEFAULT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.ref_statuses ALTER COLUMN pk_id SET DEFAULT nextval('task_manager.t_status_pk_id_seq'::regclass);


--
-- TOC entry 2728 (class 2604 OID 26137)
-- Name: t_employees pk_id; Type: DEFAULT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_employees ALTER COLUMN pk_id SET DEFAULT nextval('task_manager.t_employees_pk_id_seq'::regclass);


--
-- TOC entry 2731 (class 2604 OID 26161)
-- Name: t_progects pk_id; Type: DEFAULT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_progects ALTER COLUMN pk_id SET DEFAULT nextval('task_manager.t_projects_pk_id_seq'::regclass);


--
-- TOC entry 2726 (class 2604 OID 26121)
-- Name: t_tasks pk_id; Type: DEFAULT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_tasks ALTER COLUMN pk_id SET DEFAULT nextval('task_manager.t_tasks_pk_id_seq'::regclass);


--
-- TOC entry 2730 (class 2604 OID 26153)
-- Name: t_users pk_id; Type: DEFAULT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_users ALTER COLUMN pk_id SET DEFAULT nextval('task_manager.t_users_pk_id_seq'::regclass);


--
-- TOC entry 2732 (class 2604 OID 26169)
-- Name: toc_emploees_projects pk_id; Type: DEFAULT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.toc_emploees_projects ALTER COLUMN pk_id SET DEFAULT nextval('task_manager.toc_emploees_projects_pk_id_seq'::regclass);


--
-- TOC entry 2888 (class 0 OID 26142)
-- Dependencies: 210
-- Data for Name: ref_positions; Type: TABLE DATA; Schema: task_manager; Owner: postgres
--

COPY task_manager.ref_positions (pk_id, c_name) FROM stdin;
1	инженер
2	Пилот
3	Водитель
\.


--
-- TOC entry 2884 (class 0 OID 26126)
-- Dependencies: 206
-- Data for Name: ref_statuses; Type: TABLE DATA; Schema: task_manager; Owner: postgres
--

COPY task_manager.ref_statuses (pk_id, c_name) FROM stdin;
1	Назначена
2	Не назначена
3	В работе
4	Приостановлена
5	Новая задача
6	На согласовании
7	Выполнена
\.


--
-- TOC entry 2886 (class 0 OID 26134)
-- Dependencies: 208
-- Data for Name: t_employees; Type: TABLE DATA; Schema: task_manager; Owner: postgres
--

COPY task_manager.t_employees (pk_id, fk_position, c_lastname, c_firstname, c_middlename, c_phone_number, c_email, is_archive) FROM stdin;
1	1	Астраханцев	Андрей	Александрович	asdasd	asdasdasd	0
3	1	Иванов	Иван	Иванович	1234-23453	Ivanov@mail.ru	0
23	3	Тест	Тест				1
24	1	                     sd	          sd				1
21	1	ыав	ыва	ыва			1
25	1	qwe	qwe				1
20	2	Петров	Пётр	Петрович	987-065	asfd@mail.ru	1
\.


--
-- TOC entry 2892 (class 0 OID 26158)
-- Dependencies: 214
-- Data for Name: t_progects; Type: TABLE DATA; Schema: task_manager; Owner: postgres
--

COPY task_manager.t_progects (pk_id, c_name, c_description, fk_employee, is_archive) FROM stdin;
2	Тест 1	Тестовый проект	1	0
1	Проект	Тестовый проект	1	0
5	Проект Ивана	Тест	3	0
6	zdsds	dfs	1	1
7	zdsds		1	1
\.


--
-- TOC entry 2882 (class 0 OID 26118)
-- Dependencies: 204
-- Data for Name: t_tasks; Type: TABLE DATA; Schema: task_manager; Owner: postgres
--

COPY task_manager.t_tasks (pk_id, c_name, c_sch_hours, c_fact_hours, fk_status, fk_progect, fk_employee, c_description, is_archive) FROM stdin;
29	Задача для проекта Ивана	6	7	7	5	1	Коментарии	0
61	Тест	5	\N	7	5	23	1	0
62	qEWRR	\N	\N	2	2	\N		1
80	qwe	4	\N	2	2	\N		0
30	ertert	8.5	\N	7	1	1	\N	0
63	пввп	\N	\N	2	1	\N		1
65	авы	\N	\N	2	2	\N		1
64	п	\N	\N	2	2	\N		1
70	павпв	\N	\N	2	2	\N		1
69	апап	\N	\N	2	2	\N		1
68	ап	\N	\N	2	2	\N		1
73	gffdfg	\N	\N	2	2	\N		1
72	sdsd	\N	\N	2	2	\N		1
71	fdffg	\N	\N	2	2	\N		1
66	аф	\N	\N	2	1	\N		1
75	cxzzc	\N	\N	5	1	\N		1
47	as	56	\N	7	1	1		0
60	ыва	21	\N	7	2	1		0
55	После согласования	0	\N	7	1	1		0
59	Задача	21	9	7	2	1		0
3	Задача 2	6	\N	1	1	1	\N	0
20	Задача (Тестовый проект 1)	5	0	7	2	1	\N	0
28	Задача 2	6	5	7	2	1		0
77	Задача	4	6	3	2	1	цуй	1
78	ваы	\N	\N	5	2	\N		1
76	fsdfsdf	10	0	3	2	3		0
74	fsdsfd	\N	\N	2	5	\N		1
67	аыв	\N	\N	2	5	\N		1
79	fg	6	76	3	5	1	hj	0
\.


--
-- TOC entry 2890 (class 0 OID 26150)
-- Dependencies: 212
-- Data for Name: t_users; Type: TABLE DATA; Schema: task_manager; Owner: postgres
--

COPY task_manager.t_users (pk_id, c_login, fk_employee, c_password) FROM stdin;
1	admin	1	123
2	Ivanov	3	123
\.


--
-- TOC entry 2894 (class 0 OID 26166)
-- Dependencies: 216
-- Data for Name: toc_emploees_projects; Type: TABLE DATA; Schema: task_manager; Owner: postgres
--

COPY task_manager.toc_emploees_projects (pk_id, fk_progects, fk_employees) FROM stdin;
1	1	1
2	1	3
3	1	20
4	1	21
\.


--
-- TOC entry 2907 (class 0 OID 0)
-- Dependencies: 209
-- Name: ref_positions_pk_id_seq; Type: SEQUENCE SET; Schema: task_manager; Owner: postgres
--

SELECT pg_catalog.setval('task_manager.ref_positions_pk_id_seq', 3, true);


--
-- TOC entry 2908 (class 0 OID 0)
-- Dependencies: 207
-- Name: t_employees_pk_id_seq; Type: SEQUENCE SET; Schema: task_manager; Owner: postgres
--

SELECT pg_catalog.setval('task_manager.t_employees_pk_id_seq', 25, true);


--
-- TOC entry 2909 (class 0 OID 0)
-- Dependencies: 213
-- Name: t_projects_pk_id_seq; Type: SEQUENCE SET; Schema: task_manager; Owner: postgres
--

SELECT pg_catalog.setval('task_manager.t_projects_pk_id_seq', 7, true);


--
-- TOC entry 2910 (class 0 OID 0)
-- Dependencies: 205
-- Name: t_status_pk_id_seq; Type: SEQUENCE SET; Schema: task_manager; Owner: postgres
--

SELECT pg_catalog.setval('task_manager.t_status_pk_id_seq', 7, true);


--
-- TOC entry 2911 (class 0 OID 0)
-- Dependencies: 203
-- Name: t_tasks_pk_id_seq; Type: SEQUENCE SET; Schema: task_manager; Owner: postgres
--

SELECT pg_catalog.setval('task_manager.t_tasks_pk_id_seq', 80, true);


--
-- TOC entry 2912 (class 0 OID 0)
-- Dependencies: 211
-- Name: t_users_pk_id_seq; Type: SEQUENCE SET; Schema: task_manager; Owner: postgres
--

SELECT pg_catalog.setval('task_manager.t_users_pk_id_seq', 2, true);


--
-- TOC entry 2913 (class 0 OID 0)
-- Dependencies: 215
-- Name: toc_emploees_projects_pk_id_seq; Type: SEQUENCE SET; Schema: task_manager; Owner: postgres
--

SELECT pg_catalog.setval('task_manager.toc_emploees_projects_pk_id_seq', 4, true);


--
-- TOC entry 2740 (class 2606 OID 26147)
-- Name: ref_positions ref_positions_pk; Type: CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.ref_positions
    ADD CONSTRAINT ref_positions_pk PRIMARY KEY (pk_id);


--
-- TOC entry 2744 (class 2606 OID 26163)
-- Name: t_progects t_ projects_pk; Type: CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_progects
    ADD CONSTRAINT "t_ projects_pk" PRIMARY KEY (pk_id);


--
-- TOC entry 2738 (class 2606 OID 26139)
-- Name: t_employees t_employees_pk; Type: CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_employees
    ADD CONSTRAINT t_employees_pk PRIMARY KEY (pk_id);


--
-- TOC entry 2736 (class 2606 OID 26131)
-- Name: ref_statuses t_status_pk; Type: CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.ref_statuses
    ADD CONSTRAINT t_status_pk PRIMARY KEY (pk_id);


--
-- TOC entry 2734 (class 2606 OID 26123)
-- Name: t_tasks t_tasks_pk; Type: CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_tasks
    ADD CONSTRAINT t_tasks_pk PRIMARY KEY (pk_id);


--
-- TOC entry 2742 (class 2606 OID 26155)
-- Name: t_users t_users_pk; Type: CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_users
    ADD CONSTRAINT t_users_pk PRIMARY KEY (pk_id);


--
-- TOC entry 2746 (class 2606 OID 26171)
-- Name: toc_emploees_projects toc_emploees_projects_pk; Type: CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.toc_emploees_projects
    ADD CONSTRAINT toc_emploees_projects_pk PRIMARY KEY (pk_id);


--
-- TOC entry 2752 (class 2606 OID 26197)
-- Name: t_progects t_ projects_fk0; Type: FK CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_progects
    ADD CONSTRAINT "t_ projects_fk0" FOREIGN KEY (fk_employee) REFERENCES task_manager.t_employees(pk_id);


--
-- TOC entry 2750 (class 2606 OID 26187)
-- Name: t_employees t_employees_fk0; Type: FK CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_employees
    ADD CONSTRAINT t_employees_fk0 FOREIGN KEY (fk_position) REFERENCES task_manager.ref_positions(pk_id);


--
-- TOC entry 2747 (class 2606 OID 26172)
-- Name: t_tasks t_tasks_fk0; Type: FK CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_tasks
    ADD CONSTRAINT t_tasks_fk0 FOREIGN KEY (fk_status) REFERENCES task_manager.ref_statuses(pk_id);


--
-- TOC entry 2748 (class 2606 OID 26177)
-- Name: t_tasks t_tasks_fk1; Type: FK CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_tasks
    ADD CONSTRAINT t_tasks_fk1 FOREIGN KEY (fk_progect) REFERENCES task_manager.t_progects(pk_id);


--
-- TOC entry 2749 (class 2606 OID 26182)
-- Name: t_tasks t_tasks_fk2; Type: FK CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_tasks
    ADD CONSTRAINT t_tasks_fk2 FOREIGN KEY (fk_employee) REFERENCES task_manager.t_employees(pk_id);


--
-- TOC entry 2751 (class 2606 OID 26192)
-- Name: t_users t_users_fk0; Type: FK CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.t_users
    ADD CONSTRAINT t_users_fk0 FOREIGN KEY (fk_employee) REFERENCES task_manager.t_employees(pk_id);


--
-- TOC entry 2753 (class 2606 OID 26202)
-- Name: toc_emploees_projects toc_emploees_projects_fk0; Type: FK CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.toc_emploees_projects
    ADD CONSTRAINT toc_emploees_projects_fk0 FOREIGN KEY (fk_progects) REFERENCES task_manager.t_progects(pk_id);


--
-- TOC entry 2754 (class 2606 OID 26207)
-- Name: toc_emploees_projects toc_emploees_projects_fk1; Type: FK CONSTRAINT; Schema: task_manager; Owner: postgres
--

ALTER TABLE ONLY task_manager.toc_emploees_projects
    ADD CONSTRAINT toc_emploees_projects_fk1 FOREIGN KEY (fk_employees) REFERENCES task_manager.t_employees(pk_id);


-- Completed on 2021-02-12 15:38:24

--
-- PostgreSQL database dump complete
--

