-- CARGA DE CATEGORIA
INSERT INTO BLOG.CATEGORY (NM_CATEGORY, STATUS) VALUES ('Português', true);
INSERT INTO BLOG.CATEGORY (NM_CATEGORY, STATUS) VALUES ('Matemática', true);
INSERT INTO BLOG.CATEGORY (NM_CATEGORY, STATUS) VALUES ('Geografica', true);
INSERT INTO BLOG.CATEGORY (NM_CATEGORY, STATUS) VALUES ('História', true);

-- CARGA DE STATUS
INSERT INTO BLOG.POST_STATUS (NM_STATUS, STATUS) VALUES ('Rascunho', true);
INSERT INTO BLOG.POST_STATUS (NM_STATUS, STATUS) VALUES ('Em avaliação', true);
INSERT INTO BLOG.POST_STATUS (NM_STATUS, STATUS) VALUES ('Aprovado', true);
INSERT INTO BLOG.POST_STATUS (NM_STATUS, STATUS) VALUES ('Reprovado', true);
INSERT INTO BLOG.POST_STATUS (NM_STATUS, STATUS) VALUES ('Ocultado', true);
INSERT INTO BLOG.POST_STATUS (NM_STATUS, STATUS) VALUES ('Excluído', true);
INSERT INTO BLOG.POST_STATUS (NM_STATUS, STATUS) VALUES ('Publicado', true);

-- CARGA DE PESSOA
INSERT INTO BLOG.PERSON (NAME, CPF, BIRTH, EMAIL, STATUS, TYPE_PERSON) VALUES ('João', '000.000.000-00', '1990-01-01', 'joao@gmail.com', true, 'P');
INSERT INTO BLOG.PERSON (NAME, CPF, BIRTH, EMAIL, STATUS, TYPE_PERSON) VALUES ('Maria', '000.000.000-01', '1980-01-01', 'maria@gmail.com', true, 'A');

-- CARGA DE USUARIO
INSERT INTO BLOG.USER (LOGIN, PASSWORD, STATUS, ID_PERSON) VALUES ('joao', '$2b$10$8MUDPrLSR4VB/Kvxz39bUuG0OhdHeiQHKIEM4CGBSNtqbs7M6QndW', true, 1);
INSERT INTO BLOG.USER (LOGIN, PASSWORD, STATUS, ID_PERSON) VALUES ('maria', '$2b$10$knhaJjnFXTOP3fdrOdj40O/BwKrE3I7sV.dMJPisCA6NgsrPvicUS', true, 2);

-- CARGA DE POSTAGEM
INSERT INTO blog.post (title, subtitle, message, image, createdat, createdby, postedat, postedby, category, post_status) VALUES
('Globalização e seus impactos no mundo atual', 'Entenda como a globalização influencia a economia, a cultura e as relações entre os países', 'A globalização é um processo caracterizado pela intensificação das relações econômicas, culturais e sociais entre os países. Com o avanço dos meios de transporte e comunicação, o mundo tornou-se mais conectado, facilitando o fluxo de informações, mercadorias e pessoas.

Esse fenômeno trouxe diversos benefícios, como o acesso a tecnologias, produtos e culturas de diferentes partes do mundo. No entanto, também gerou desafios, como o aumento das desigualdades sociais, a padronização cultural e a dependência econômica entre países.

Ao estudar a globalização, o estudante do ensino médio passa a compreender melhor o funcionamento do mundo contemporâneo e os impactos desse processo em sua vida cotidiana, desenvolvendo uma visão mais crítica e consciente sobre a realidade global.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', '2025-12-22 23:23:23.844', 1, '2025-12-09 20:25:00.000', 1, 3, 7);

INSERT INTO blog.post (title, subtitle, message, image, createdat, createdby, postedat, postedby, category, post_status) VALUES
('A Revolução Industrial e a transformação da sociedade moderna', 'Conheça as mudanças econômicas, sociais e tecnológicas provocadas pela Revolução Industrial', 'A Revolução Industrial foi um dos processos históricos mais importantes da humanidade, iniciando profundas transformações na forma de produzir, trabalhar e viver em sociedade. Surgida no século XVIII, principalmente na Inglaterra, ela marcou a substituição do trabalho artesanal pelo uso de máquinas e pela produção em larga escala.

Com o avanço das indústrias, as cidades cresceram rapidamente, atraindo trabalhadores do campo em busca de emprego. Esse processo gerou novas oportunidades econômicas, mas também trouxe desafios sociais, como jornadas de trabalho excessivas, baixos salários e condições precárias nas fábricas. Ao mesmo tempo, surgiram novas classes sociais e mudanças nas relações de trabalho.

Estudar a Revolução Industrial ajuda o estudante a compreender a origem do mundo industrializado e a refletir sobre os impactos econômicos e sociais que ainda influenciam a sociedade contemporânea.', NULL, '2025-12-22 23:16:39.925', 1, '2025-12-10 20:52:00.000', 1, 4, 7);

INSERT INTO blog.post (title, subtitle, message, image, createdat, createdby, postedat, postedby, category, post_status) VALUES
('A leitura e seu papel na formação do pensamento crítico', 'Entenda como a leitura desenvolve interpretação, argumentação e autonomia intelectual ao longo da vida escolar', 'A leitura é um dos pilares mais importantes da formação intelectual no ensino médio. Ler com frequência não significa apenas compreender palavras, mas desenvolver a capacidade de interpretar ideias, identificar argumentos e refletir sobre diferentes pontos de vista. Esse processo é essencial para a construção do pensamento crítico e para a formação de cidadãos mais conscientes.

Ao entrar em contato com diferentes gêneros textuais, como livros literários, reportagens, artigos de opinião e textos científicos, o estudante amplia seu repertório cultural e aprende a analisar informações de forma mais profunda. A leitura estimula o questionamento, a comparação de ideias e a construção de opiniões próprias, habilidades fundamentais para o ambiente escolar e social.

Além disso, o hábito da leitura contribui diretamente para a melhoria da escrita. Quem lê mais tende a escrever melhor, organizando ideias com clareza, coesão e coerência. Dessa forma, incentivar a leitura é investir no desenvolvimento intelectual, acadêmico e pessoal dos estudantes.', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f', '2025-12-22 23:16:40.739', 1, '2025-12-21 20:17:00.000', 1, 1, 7);

INSERT INTO blog.post (title, subtitle, message, image, createdat, createdby, postedat, postedby, category, post_status) VALUES
('Biomas e sua importância para o equilíbrio ambiental', 'Entenda como os biomas influenciam o clima, a biodiversidade e a vida humana', 'Os biomas são grandes conjuntos de ecossistemas que apresentam características semelhantes de clima, vegetação e fauna. Eles desempenham um papel essencial no equilíbrio ambiental do planeta, influenciando fatores como o regime de chuvas, a temperatura e a biodiversidade.

No Brasil, biomas como a Amazônia, o Cerrado, a Mata Atlântica e o Pantanal possuem enorme importância ambiental e econômica. No entanto, ações humanas como o desmatamento, as queimadas e a expansão urbana desordenada ameaçam esses ecossistemas, colocando em risco a preservação ambiental.

Compreender a importância dos biomas permite que os estudantes reflitam sobre a relação entre sociedade e natureza, incentivando práticas mais sustentáveis e responsáveis para garantir o equilíbrio ambiental das futuras gerações.', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', '2025-12-22 23:14:12.034', 1, '2025-12-10 20:22:00.000', 1, 1, 7);

INSERT INTO blog.post (title, subtitle, message, image, createdat, createdby, postedat, postedby, category, post_status) VALUES
('A redação como ferramenta de argumentação e cidadania', 'Veja como a prática da redação ajuda o estudante a organizar ideias e defender pontos de vista', 'A redação é uma das principais formas de expressão no ensino médio e desempenha um papel fundamental na formação do pensamento crítico e da cidadania. Ao escrever, o estudante aprende a organizar ideias, construir argumentos e apresentar opiniões de maneira clara e coerente, respeitando normas da língua portuguesa.

A prática constante da escrita estimula a reflexão sobre temas sociais, culturais e políticos, permitindo que o aluno desenvolva uma visão mais ampla da realidade. Além disso, escrever ajuda a aprimorar a capacidade de interpretação de textos, pois quem escreve com frequência passa a ler de forma mais atenta e analítica.

Dominar a redação é essencial não apenas para avaliações escolares e exames como o vestibular e o ENEM, mas também para a vida acadêmica e profissional, onde a comunicação clara e objetiva é cada vez mais valorizada.', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', '2025-12-22 22:49:11.869', 1, '2025-12-01 20:23:00.000', 1, 1, 7);

INSERT INTO blog.post (title, subtitle, message, image, createdat, createdby, postedat, postedby, category, post_status) VALUES
('A matemática aplicada no cotidiano dos estudantes', 'Descubra como a matemática está presente em decisões práticas do dia a dia escolar e social', 'A matemática faz parte do cotidiano de todos, mesmo quando não percebemos. No ensino médio, ela se manifesta em situações simples, como o cálculo de descontos, o controle de gastos, o planejamento do tempo e a interpretação de gráficos e tabelas. Esses conhecimentos são fundamentais para a vida prática e para o desenvolvimento do raciocínio lógico.

Conceitos como porcentagem, proporção, estatística e probabilidade ajudam os estudantes a compreender informações, analisar dados e tomar decisões mais conscientes. A matemática também é essencial em áreas como tecnologia, economia, engenharia e ciência, tornando-se uma base importante para diversas profissões.

Ao compreender a aplicação prática da matemática, o estudante passa a enxergá-la como uma ferramenta útil e necessária, deixando de vê-la apenas como uma disciplina abstrata e distante da realidade.', NULL, '2025-12-22 23:16:37.625', 1, '2025-12-01 20:51:00.000', 1, 2, 7);

INSERT INTO blog.post (title, subtitle, message, image, createdat, createdby, postedat, postedby, category, post_status) VALUES
('A Primeira Guerra Mundial e suas causas principais', 'Compreenda os fatores políticos, econômicos e sociais que levaram ao início da Primeira Guerra Mundial', 'A Primeira Guerra Mundial, ocorrida entre 1914 e 1918, foi um dos conflitos mais marcantes da história contemporânea. Suas causas estão relacionadas a uma combinação de fatores como o nacionalismo exacerbado, o imperialismo, a corrida armamentista e a formação de alianças entre as potências europeias.

O assassinato do arquiduque Francisco Ferdinando, herdeiro do Império Austro-Húngaro, foi o estopim para o início da guerra, mas as tensões já vinham se acumulando há décadas. O conflito envolveu diversos países e resultou em milhões de mortos, além de profundas transformações políticas e territoriais.

Estudar a Primeira Guerra Mundial permite ao estudante compreender como rivalidades internacionais podem gerar grandes conflitos e refletir sobre a importância do diálogo e da diplomacia para a manutenção da paz.', NULL, '2025-12-22 23:23:24.966', 1, '2025-12-10 20:52:00.000', 1, 4, 7);