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


INSERT INTO blog.questao (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status) VALUES
('Observe o texto a seguir. \nÀ Beça\nGumercindo Bessa (1859-1913), jornalista e jurista alagoano, foi adversário de Rui Barbosa na Questão Acreana, em que o Estado do Amazonas pretendia incorporar o Território do Acre. Bessa venceu a questão em favor do Acre, apresentando argumentos irrefutáveis e numa quantidade impressionante. Posteriormente, mas não muito, Rodrigues Alves (Presidente do Brasil de 1902 a 1906) diria a um cidadão que lhe apresentava um pedido com justificativas infindáveis: O senhor tem argumentos à Bessa. A partir daí, popularizou-se a expressão à beça com o sentido de uma grande quantidade ou intensidade. Por que os dois esses viraram cê-cedilha? Ninguém sabe.\n(Reinaldo Pimenta, A Casa da Mãe Joana 2)\n A ideia central do texto é a de','B',1,1,1,1,1,1,true);

INSERT INTO blog.alternativas (alternativa, questaoid) values ('(A) explicar a origem histórica de uma expressão popular.', 1);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(B) justificar a duplicidade de grafia de uma expressão.', 1);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(C) indicar o sentido preciso da expressão à beça.', 1);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(D) mostrar como as palavras se constroem socialmente.', 1);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(E) documentar um erro ortográfico.', 1);


INSERT INTO blog.questao (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status) VALUES
('Assinale a frase em que o segmento sublinhado foi substituído de forma conveniente por um particípio.','C',1,1,1,1,1,1,true);

INSERT INTO blog.alternativas (alternativa, questaoid) values ('(A) Qualquer pessoa que não tem senso de humor está à mercê de todos / desprovida de.', 2);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(B) Os empresários que não têm dinheiro, recorrem aos empréstimos bancários / encarecidos de.', 2);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(C) Os empregados que não têm iniciativa não recebem promoções / inativos.', 2);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(D) Os clientes que não têm possibilidades de locomoção, sobem pelas escadas rolantes / impossíveis.', 2);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(E) Aquele que não tem motivo para pedir ajuda, deve ficar quieto / desmotivado.', 2);


INSERT INTO blog.questao (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status) VALUES
('Assinale a frase em que a utilização do acento grave indicativo da crase é realizada de forma errada.','D',1,1,1,1,1,1,true);

INSERT INTO blog.alternativas (alternativa, questaoid) values ('(A) Seis horas de sono, seis horas no estudo das leis, quatro passadas em oração, as restantes dedicadas à natureza.', 3);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(B) As datas, só elas dão verdadeira consistência à vida e à sorte.', 3);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(C) O futuro é algo que todos nós atingimos à velocidade de sessenta minutos por hora.', 3);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(D) À medida que tenho menos tempo para praticar as coisas, menos curiosidade tenho por aprendê-las.', 3);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(E) O futuro não pertence à ninguém. Não há precursores, apenas há atrasados.', 3);


INSERT INTO blog.questao (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status) VALUES
('Em todas as frases abaixo aparece a conjunção e sublinhada. Assinale a frase em que ela é empregada com valor adversativo.','D',1,1,1,1,1,1,true);

INSERT INTO blog.alternativas (alternativa, questaoid) values ('(A) Vida: um espaço de tempo cuja primeira metade é arruinada por nossos pais e a segunda metade, por nossos filhos.', 4);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(B) Uma casa é feita de tijolo e pedra. Um lar é feito apenas de amor.', 4);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(C) Esculpir: eu escolho um bloco de mármore e retiro tudo o que não preciso.', 4);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(D) Arte é fazer alguma coisa do nada e vendê-la.', 4);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(E) Nada tenho a dizer e estou dizendo-o. Tal é a poesia.', 4);


INSERT INTO blog.questao (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status) VALUES
('A maioria das palavras mostra vários significados (polissemia), o que também ocorre com as preposições. Indique a frase em que a preposição PARA tem seu significado corretamente indicado.','C',1,1,1,1,1,1,true);

INSERT INTO blog.alternativas (alternativa, questaoid) values ('(A) Meu sonho é ir para a Europa / finalidade.', 5);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(B) Saiu para comprar roupas de frio / direção.', 5);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(C) Estava para sair quando chegaram as visitas / proximidade.', 5);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(D) O ônibus era para cinquenta passageiros / interesse.', 5);
INSERT INTO blog.alternativas (alternativa, questaoid) values ('(E) Para os pássaros, o canto faz parte da vida / destinação.', 5);

commit;



-- ============================================
-- MASSA DE DADOS - QUESTÕES E ALTERNATIVAS
-- Ajuste os IDs de category e createdby se necessário
-- ============================================

-- ============================================
-- PORTUGUÊS
-- ============================================

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Assinale a alternativa em que a palavra está grafada corretamente.', 'B', 1, 1, 1, 1, 1, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Excessão', id FROM q
UNION ALL
SELECT '(B) Exceção', id FROM q
UNION ALL
SELECT '(C) Excessãoo', id FROM q
UNION ALL
SELECT '(D) Exessão', id FROM q
UNION ALL
SELECT '(E) Excessão', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Em qual alternativa todas as palavras são substantivos?', 'C', 1, 1, 1, 1, 1, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Bonito, correr, alegria', id FROM q
UNION ALL
SELECT '(B) Casa, estudar, feliz', id FROM q
UNION ALL
SELECT '(C) Livro, mesa, escola', id FROM q
UNION ALL
SELECT '(D) Rapidamente, janela, cantar', id FROM q
UNION ALL
SELECT '(E) Alto, baixo, longe', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Assinale a frase em que o verbo está no pretérito perfeito.', 'A', 1, 1, 1, 1, 1, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Ontem eu estudei para a prova.', id FROM q
UNION ALL
SELECT '(B) Eu estudo todos os dias.', id FROM q
UNION ALL
SELECT '(C) Amanhã estudarei mais.', id FROM q
UNION ALL
SELECT '(D) Eu estudava quando você chegou.', id FROM q
UNION ALL
SELECT '(E) Eu estudaria se tivesse tempo.', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Qual alternativa apresenta um pronome pessoal?', 'D', 1, 1, 1, 1, 1, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Bonito', id FROM q
UNION ALL
SELECT '(B) Casa', id FROM q
UNION ALL
SELECT '(C) Rapidamente', id FROM q
UNION ALL
SELECT '(D) Ele', id FROM q
UNION ALL
SELECT '(E) Ontem', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Em qual alternativa há um adjetivo?', 'E', 1, 1, 1, 1, 1, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Escola', id FROM q
UNION ALL
SELECT '(B) Menino', id FROM q
UNION ALL
SELECT '(C) Correr', id FROM q
UNION ALL
SELECT '(D) Amanhã', id FROM q
UNION ALL
SELECT '(E) Feliz', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Assinale a frase com pontuação correta.', 'C', 1, 1, 1, 1, 1, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) João vamos estudar.', id FROM q
UNION ALL
SELECT '(B) João vamos, estudar.', id FROM q
UNION ALL
SELECT '(C) João, vamos estudar.', id FROM q
UNION ALL
SELECT '(D) João vamos estudar,', id FROM q
UNION ALL
SELECT '(E) João; vamos estudar.', id FROM q;

-- ============================================
-- MATEMÁTICA
-- ============================================

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Quanto é 7 x 8?', 'B', 1, 1, 1, 1, 2, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 48', id FROM q
UNION ALL
SELECT '(B) 56', id FROM q
UNION ALL
SELECT '(C) 64', id FROM q
UNION ALL
SELECT '(D) 54', id FROM q
UNION ALL
SELECT '(E) 58', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Qual é o resultado de 144 ÷ 12?', 'A', 1, 1, 1, 1, 2, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 12', id FROM q
UNION ALL
SELECT '(B) 14', id FROM q
UNION ALL
SELECT '(C) 16', id FROM q
UNION ALL
SELECT '(D) 10', id FROM q
UNION ALL
SELECT '(E) 18', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Se um triângulo possui três lados iguais, ele é chamado de:', 'D', 1, 1, 1, 1, 2, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Escaleno', id FROM q
UNION ALL
SELECT '(B) Retângulo', id FROM q
UNION ALL
SELECT '(C) Isósceles', id FROM q
UNION ALL
SELECT '(D) Equilátero', id FROM q
UNION ALL
SELECT '(E) Obtusângulo', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Qual fração representa a metade?', 'C', 1, 1, 1, 1, 2, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1/3', id FROM q
UNION ALL
SELECT '(B) 2/3', id FROM q
UNION ALL
SELECT '(C) 1/2', id FROM q
UNION ALL
SELECT '(D) 3/4', id FROM q
UNION ALL
SELECT '(E) 2/5', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Quanto é 25% de 200?', 'E', 1, 1, 1, 1, 2, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 20', id FROM q
UNION ALL
SELECT '(B) 30', id FROM q
UNION ALL
SELECT '(C) 40', id FROM q
UNION ALL
SELECT '(D) 60', id FROM q
UNION ALL
SELECT '(E) 50', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Resolva: 18 + 27 =', 'D', 1, 1, 1, 1, 2, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 35', id FROM q
UNION ALL
SELECT '(B) 40', id FROM q
UNION ALL
SELECT '(C) 43', id FROM q
UNION ALL
SELECT '(D) 45', id FROM q
UNION ALL
SELECT '(E) 48', id FROM q;

-- ============================================
-- CIÊNCIAS
-- ============================================

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Qual planeta é conhecido como planeta vermelho?', 'A', 1, 1, 1, 1, 3, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Marte', id FROM q
UNION ALL
SELECT '(B) Vênus', id FROM q
UNION ALL
SELECT '(C) Júpiter', id FROM q
UNION ALL
SELECT '(D) Saturno', id FROM q
UNION ALL
SELECT '(E) Mercúrio', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Qual gás é essencial para a respiração humana?', 'B', 1, 1, 1, 1, 3, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Nitrogênio', id FROM q
UNION ALL
SELECT '(B) Oxigênio', id FROM q
UNION ALL
SELECT '(C) Hélio', id FROM q
UNION ALL
SELECT '(D) Hidrogênio', id FROM q
UNION ALL
SELECT '(E) Gás carbônico', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('A água ferve, ao nível do mar, em qual temperatura?', 'C', 1, 1, 1, 1, 3, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 80°C', id FROM q
UNION ALL
SELECT '(B) 90°C', id FROM q
UNION ALL
SELECT '(C) 100°C', id FROM q
UNION ALL
SELECT '(D) 120°C', id FROM q
UNION ALL
SELECT '(E) 70°C', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Qual órgão do corpo humano é responsável por bombear o sangue?', 'D', 1, 1, 1, 1, 3, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Pulmão', id FROM q
UNION ALL
SELECT '(B) Fígado', id FROM q
UNION ALL
SELECT '(C) Rim', id FROM q
UNION ALL
SELECT '(D) Coração', id FROM q
UNION ALL
SELECT '(E) Estômago', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('As plantas produzem seu próprio alimento por meio da:', 'E', 1, 1, 1, 1, 3, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Respiração', id FROM q
UNION ALL
SELECT '(B) Digestão', id FROM q
UNION ALL
SELECT '(C) Germinação', id FROM q
UNION ALL
SELECT '(D) Polinização', id FROM q
UNION ALL
SELECT '(E) Fotossíntese', id FROM q;

WITH q AS (
  INSERT INTO blog.questao
    (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES
    ('Qual é a principal fonte de energia da Terra?', 'A', 1, 1, 1, 1, 3, 1, true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Sol', id FROM q
UNION ALL
SELECT '(B) Lua', id FROM q
UNION ALL
SELECT '(C) Vento', id FROM q
UNION ALL
SELECT '(D) Água', id FROM q
UNION ALL
SELECT '(E) Petróleo', id FROM q;


-- =========================================================
-- MASSA DE DADOS - 100 QUESTÕES
-- Categoria 1 = Português
-- Categoria 2 = Matemática
-- Categoria 3 = Geografia
-- Categoria 4 = História
-- =========================================================

-- =========================================================
-- PORTUGUÊS (1 a 25)
-- =========================================================

WITH q AS (
  INSERT INTO blog.questao (enunciado, resposta, escolaridade, turno, periodo, tipo_questao, category, createdby, status)
  VALUES ('Assinale a alternativa em que a palavra está escrita corretamente.', 'B', 1,1,1,1,1,1,true)
  RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Excessão', id FROM q UNION ALL
SELECT '(B) Exceção', id FROM q UNION ALL
SELECT '(C) Exessão', id FROM q UNION ALL
SELECT '(D) Excesssão', id FROM q UNION ALL
SELECT '(E) Excessão', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual alternativa apresenta somente substantivos?','C',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Bonito, correr, feliz', id FROM q UNION ALL
SELECT '(B) Andar, escola, rapidamente', id FROM q UNION ALL
SELECT '(C) Mesa, livro, cadeira', id FROM q UNION ALL
SELECT '(D) Alto, baixo, longe', id FROM q UNION ALL
SELECT '(E) Cantar, viver, sorrir', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Em qual frase o verbo está no passado?','A',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Ontem eu viajei para o Rio.', id FROM q UNION ALL
SELECT '(B) Hoje eu estudo bastante.', id FROM q UNION ALL
SELECT '(C) Amanhã irei ao mercado.', id FROM q UNION ALL
SELECT '(D) Eu viajarei em julho.', id FROM q UNION ALL
SELECT '(E) Eu estudaria mais.', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual das palavras abaixo é um adjetivo?','D',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Casa', id FROM q UNION ALL
SELECT '(B) Correr', id FROM q UNION ALL
SELECT '(C) Ontem', id FROM q UNION ALL
SELECT '(D) Bonito', id FROM q UNION ALL
SELECT '(E) Escola', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Em qual alternativa há um pronome pessoal?','E',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Rápido', id FROM q UNION ALL
SELECT '(B) Ontem', id FROM q UNION ALL
SELECT '(C) Escola', id FROM q UNION ALL
SELECT '(D) Muito', id FROM q UNION ALL
SELECT '(E) Ele', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Assinale a frase com pontuação correta.','C',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) João vamos estudar.', id FROM q UNION ALL
SELECT '(B) João vamos, estudar.', id FROM q UNION ALL
SELECT '(C) João, vamos estudar.', id FROM q UNION ALL
SELECT '(D) João vamos estudar,', id FROM q UNION ALL
SELECT '(E) João; vamos estudar.', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual alternativa apresenta um verbo no infinitivo?','A',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Cantar', id FROM q UNION ALL
SELECT '(B) Cantou', id FROM q UNION ALL
SELECT '(C) Cantando', id FROM q UNION ALL
SELECT '(D) Canto', id FROM q UNION ALL
SELECT '(E) Cantaria', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Em "Maria comprou um livro", o sujeito é:','B',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) comprou', id FROM q UNION ALL
SELECT '(B) Maria', id FROM q UNION ALL
SELECT '(C) um livro', id FROM q UNION ALL
SELECT '(D) livro', id FROM q UNION ALL
SELECT '(E) comprou um livro', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A palavra "felizmente" é classificada como:','D',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Substantivo', id FROM q UNION ALL
SELECT '(B) Adjetivo', id FROM q UNION ALL
SELECT '(C) Verbo', id FROM q UNION ALL
SELECT '(D) Advérbio', id FROM q UNION ALL
SELECT '(E) Pronome', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual alternativa apresenta um artigo definido?','A',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) o', id FROM q UNION ALL
SELECT '(B) um', id FROM q UNION ALL
SELECT '(C) alguma', id FROM q UNION ALL
SELECT '(D) nenhuma', id FROM q UNION ALL
SELECT '(E) qualquer', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Em qual alternativa a palavra é um verbo?','E',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Casa', id FROM q UNION ALL
SELECT '(B) Janela', id FROM q UNION ALL
SELECT '(C) Alegre', id FROM q UNION ALL
SELECT '(D) Ontem', id FROM q UNION ALL
SELECT '(E) Estudar', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual alternativa contém uma palavra no plural?','C',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Flor', id FROM q UNION ALL
SELECT '(B) Papel', id FROM q UNION ALL
SELECT '(C) Meninos', id FROM q UNION ALL
SELECT '(D) Sol', id FROM q UNION ALL
SELECT '(E) Mar', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Na frase "O menino correu", o núcleo do sujeito é:','B',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) correu', id FROM q UNION ALL
SELECT '(B) menino', id FROM q UNION ALL
SELECT '(C) o', id FROM q UNION ALL
SELECT '(D) frase', id FROM q UNION ALL
SELECT '(E) sujeito', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual das opções apresenta um substantivo próprio?','A',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Brasil', id FROM q UNION ALL
SELECT '(B) país', id FROM q UNION ALL
SELECT '(C) cidade', id FROM q UNION ALL
SELECT '(D) rio', id FROM q UNION ALL
SELECT '(E) montanha', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A palavra "rapidamente" indica:','D',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) pessoa', id FROM q UNION ALL
SELECT '(B) lugar', id FROM q UNION ALL
SELECT '(C) objeto', id FROM q UNION ALL
SELECT '(D) modo', id FROM q UNION ALL
SELECT '(E) tempo verbal', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual frase está na ordem direta?','C',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Ao mercado foi João ontem.', id FROM q UNION ALL
SELECT '(B) Foi João ao mercado ontem.', id FROM q UNION ALL
SELECT '(C) João foi ao mercado ontem.', id FROM q UNION ALL
SELECT '(D) Ontem ao mercado foi João.', id FROM q UNION ALL
SELECT '(E) Ao mercado ontem João foi.', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A palavra "escola" é classificada como:','B',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Verbo', id FROM q UNION ALL
SELECT '(B) Substantivo', id FROM q UNION ALL
SELECT '(C) Adjetivo', id FROM q UNION ALL
SELECT '(D) Pronome', id FROM q UNION ALL
SELECT '(E) Preposição', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Em "Nós estudamos muito", o pronome é:','A',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Nós', id FROM q UNION ALL
SELECT '(B) estudamos', id FROM q UNION ALL
SELECT '(C) muito', id FROM q UNION ALL
SELECT '(D) frase', id FROM q UNION ALL
SELECT '(E) não há pronome', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual alternativa apresenta uma interjeição?','E',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) mesa', id FROM q UNION ALL
SELECT '(B) livro', id FROM q UNION ALL
SELECT '(C) correr', id FROM q UNION ALL
SELECT '(D) bonito', id FROM q UNION ALL
SELECT '(E) Ah!', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Na frase "Pedro e Ana chegaram", a conjunção é:','C',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Pedro', id FROM q UNION ALL
SELECT '(B) Ana', id FROM q UNION ALL
SELECT '(C) e', id FROM q UNION ALL
SELECT '(D) chegaram', id FROM q UNION ALL
SELECT '(E) frase', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual alternativa contém uma preposição?','D',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) bonito', id FROM q UNION ALL
SELECT '(B) alto', id FROM q UNION ALL
SELECT '(C) correr', id FROM q UNION ALL
SELECT '(D) para', id FROM q UNION ALL
SELECT '(E) escola', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A palavra "ontem" indica ideia de:','B',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) lugar', id FROM q UNION ALL
SELECT '(B) tempo', id FROM q UNION ALL
SELECT '(C) modo', id FROM q UNION ALL
SELECT '(D) negação', id FROM q UNION ALL
SELECT '(E) afirmação', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual alternativa apresenta um sinônimo de "alegre"?','A',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) feliz', id FROM q UNION ALL
SELECT '(B) triste', id FROM q UNION ALL
SELECT '(C) bravo', id FROM q UNION ALL
SELECT '(D) lento', id FROM q UNION ALL
SELECT '(E) antigo', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual alternativa apresenta um antônimo de "alto"?','D',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) grande', id FROM q UNION ALL
SELECT '(B) largo', id FROM q UNION ALL
SELECT '(C) comprido', id FROM q UNION ALL
SELECT '(D) baixo', id FROM q UNION ALL
SELECT '(E) enorme', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Na frase "A menina bonita chegou", o adjetivo é:','C',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) menina', id FROM q UNION ALL
SELECT '(B) chegou', id FROM q UNION ALL
SELECT '(C) bonita', id FROM q UNION ALL
SELECT '(D) a', id FROM q UNION ALL
SELECT '(E) frase', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual opção apresenta um substantivo coletivo?','E',1,1,1,1,DEFAULT,1,NULL,NULL,1,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) livro', id FROM q UNION ALL
SELECT '(B) menino', id FROM q UNION ALL
SELECT '(C) árvore', id FROM q UNION ALL
SELECT '(D) cadeira', id FROM q UNION ALL
SELECT '(E) cardume', id FROM q;

-- =========================================================
-- MATEMÁTICA (26 a 50)
-- =========================================================

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 7 x 8?','B',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 48', id FROM q UNION ALL
SELECT '(B) 56', id FROM q UNION ALL
SELECT '(C) 64', id FROM q UNION ALL
SELECT '(D) 54', id FROM q UNION ALL
SELECT '(E) 58', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 144 ÷ 12?','A',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 12', id FROM q UNION ALL
SELECT '(B) 14', id FROM q UNION ALL
SELECT '(C) 16', id FROM q UNION ALL
SELECT '(D) 10', id FROM q UNION ALL
SELECT '(E) 18', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 25% de 200?','E',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 20', id FROM q UNION ALL
SELECT '(B) 30', id FROM q UNION ALL
SELECT '(C) 40', id FROM q UNION ALL
SELECT '(D) 60', id FROM q UNION ALL
SELECT '(E) 50', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Resolva: 18 + 27 =','D',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 35', id FROM q UNION ALL
SELECT '(B) 40', id FROM q UNION ALL
SELECT '(C) 43', id FROM q UNION ALL
SELECT '(D) 45', id FROM q UNION ALL
SELECT '(E) 48', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o dobro de 35?','B',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 65', id FROM q UNION ALL
SELECT '(B) 70', id FROM q UNION ALL
SELECT '(C) 75', id FROM q UNION ALL
SELECT '(D) 80', id FROM q UNION ALL
SELECT '(E) 85', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é a metade de 96?','C',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 52', id FROM q UNION ALL
SELECT '(B) 50', id FROM q UNION ALL
SELECT '(C) 48', id FROM q UNION ALL
SELECT '(D) 46', id FROM q UNION ALL
SELECT '(E) 44', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 9²?','A',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 81', id FROM q UNION ALL
SELECT '(B) 72', id FROM q UNION ALL
SELECT '(C) 18', id FROM q UNION ALL
SELECT '(D) 90', id FROM q UNION ALL
SELECT '(E) 99', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 5³?','D',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 25', id FROM q UNION ALL
SELECT '(B) 75', id FROM q UNION ALL
SELECT '(C) 100', id FROM q UNION ALL
SELECT '(D) 125', id FROM q UNION ALL
SELECT '(E) 150', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual fração representa a metade?','C',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1/3', id FROM q UNION ALL
SELECT '(B) 2/3', id FROM q UNION ALL
SELECT '(C) 1/2', id FROM q UNION ALL
SELECT '(D) 3/4', id FROM q UNION ALL
SELECT '(E) 2/5', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 15% de 100?','A',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 15', id FROM q UNION ALL
SELECT '(B) 20', id FROM q UNION ALL
SELECT '(C) 10', id FROM q UNION ALL
SELECT '(D) 25', id FROM q UNION ALL
SELECT '(E) 30', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 11 x 11?','B',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 111', id FROM q UNION ALL
SELECT '(B) 121', id FROM q UNION ALL
SELECT '(C) 131', id FROM q UNION ALL
SELECT '(D) 101', id FROM q UNION ALL
SELECT '(E) 141', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 1000 - 475?','E',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 500', id FROM q UNION ALL
SELECT '(B) 515', id FROM q UNION ALL
SELECT '(C) 520', id FROM q UNION ALL
SELECT '(D) 535', id FROM q UNION ALL
SELECT '(E) 525', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 36 ÷ 6?','C',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 5', id FROM q UNION ALL
SELECT '(B) 7', id FROM q UNION ALL
SELECT '(C) 6', id FROM q UNION ALL
SELECT '(D) 8', id FROM q UNION ALL
SELECT '(E) 9', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o MMC entre 4 e 6?','D',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 4', id FROM q UNION ALL
SELECT '(B) 6', id FROM q UNION ALL
SELECT '(C) 8', id FROM q UNION ALL
SELECT '(D) 12', id FROM q UNION ALL
SELECT '(E) 24', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o MDC entre 12 e 18?','A',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 6', id FROM q UNION ALL
SELECT '(B) 3', id FROM q UNION ALL
SELECT '(C) 9', id FROM q UNION ALL
SELECT '(D) 12', id FROM q UNION ALL
SELECT '(E) 18', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 0,5 + 0,25?','E',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 0,6', id FROM q UNION ALL
SELECT '(B) 0,65', id FROM q UNION ALL
SELECT '(C) 0,7', id FROM q UNION ALL
SELECT '(D) 0,8', id FROM q UNION ALL
SELECT '(E) 0,75', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 3/4 de 20?','B',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 12', id FROM q UNION ALL
SELECT '(B) 15', id FROM q UNION ALL
SELECT '(C) 10', id FROM q UNION ALL
SELECT '(D) 18', id FROM q UNION ALL
SELECT '(E) 16', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Se x = 7, então 2x + 3 =','C',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 14', id FROM q UNION ALL
SELECT '(B) 15', id FROM q UNION ALL
SELECT '(C) 17', id FROM q UNION ALL
SELECT '(D) 18', id FROM q UNION ALL
SELECT '(E) 19', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o perímetro de um quadrado de lado 5?','A',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 20', id FROM q UNION ALL
SELECT '(B) 25', id FROM q UNION ALL
SELECT '(C) 15', id FROM q UNION ALL
SELECT '(D) 10', id FROM q UNION ALL
SELECT '(E) 30', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é a área de um retângulo de base 4 e altura 3?','D',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 7', id FROM q UNION ALL
SELECT '(B) 10', id FROM q UNION ALL
SELECT '(C) 14', id FROM q UNION ALL
SELECT '(D) 12', id FROM q UNION ALL
SELECT '(E) 16', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual número é primo?','B',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 9', id FROM q UNION ALL
SELECT '(B) 13', id FROM q UNION ALL
SELECT '(C) 15', id FROM q UNION ALL
SELECT '(D) 21', id FROM q UNION ALL
SELECT '(E) 25', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 8 x 9?','E',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 64', id FROM q UNION ALL
SELECT '(B) 68', id FROM q UNION ALL
SELECT '(C) 70', id FROM q UNION ALL
SELECT '(D) 71', id FROM q UNION ALL
SELECT '(E) 72', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 90 ÷ 10?','A',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 9', id FROM q UNION ALL
SELECT '(B) 8', id FROM q UNION ALL
SELECT '(C) 7', id FROM q UNION ALL
SELECT '(D) 6', id FROM q UNION ALL
SELECT '(E) 5', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 13 + 29?','C',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 40', id FROM q UNION ALL
SELECT '(B) 41', id FROM q UNION ALL
SELECT '(C) 42', id FROM q UNION ALL
SELECT '(D) 43', id FROM q UNION ALL
SELECT '(E) 44', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quanto é 64 ÷ 8?','D',1,1,1,1,DEFAULT,1,NULL,NULL,2,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 6', id FROM q UNION ALL
SELECT '(B) 7', id FROM q UNION ALL
SELECT '(C) 9', id FROM q UNION ALL
SELECT '(D) 8', id FROM q UNION ALL
SELECT '(E) 10', id FROM q;

-- =========================================================
-- GEOGRAFIA (51 a 75)
-- =========================================================

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o maior país da América do Sul em extensão territorial?','A',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Brasil', id FROM q UNION ALL
SELECT '(B) Argentina', id FROM q UNION ALL
SELECT '(C) Chile', id FROM q UNION ALL
SELECT '(D) Peru', id FROM q UNION ALL
SELECT '(E) Colômbia', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é a capital do Brasil?','B',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Rio de Janeiro', id FROM q UNION ALL
SELECT '(B) Brasília', id FROM q UNION ALL
SELECT '(C) São Paulo', id FROM q UNION ALL
SELECT '(D) Salvador', id FROM q UNION ALL
SELECT '(E) Belo Horizonte', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual oceano banha o litoral brasileiro?','C',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Índico', id FROM q UNION ALL
SELECT '(B) Pacífico', id FROM q UNION ALL
SELECT '(C) Atlântico', id FROM q UNION ALL
SELECT '(D) Ártico', id FROM q UNION ALL
SELECT '(E) Antártico', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o continente onde fica o Egito?','D',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Europa', id FROM q UNION ALL
SELECT '(B) Ásia', id FROM q UNION ALL
SELECT '(C) América', id FROM q UNION ALL
SELECT '(D) África', id FROM q UNION ALL
SELECT '(E) Oceania', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual linha imaginária divide a Terra em hemisfério norte e sul?','E',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Trópico de Capricórnio', id FROM q UNION ALL
SELECT '(B) Trópico de Câncer', id FROM q UNION ALL
SELECT '(C) Meridiano de Greenwich', id FROM q UNION ALL
SELECT '(D) Linha Internacional da Data', id FROM q UNION ALL
SELECT '(E) Linha do Equador', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o maior oceano do planeta?','A',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Pacífico', id FROM q UNION ALL
SELECT '(B) Atlântico', id FROM q UNION ALL
SELECT '(C) Índico', id FROM q UNION ALL
SELECT '(D) Ártico', id FROM q UNION ALL
SELECT '(E) Antártico', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual região brasileira é a mais populosa?','B',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Norte', id FROM q UNION ALL
SELECT '(B) Sudeste', id FROM q UNION ALL
SELECT '(C) Sul', id FROM q UNION ALL
SELECT '(D) Centro-Oeste', id FROM q UNION ALL
SELECT '(E) Nordeste', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o rio mais extenso do mundo segundo muitos estudos escolares?','C',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Nilo', id FROM q UNION ALL
SELECT '(B) Yangtzé', id FROM q UNION ALL
SELECT '(C) Amazonas', id FROM q UNION ALL
SELECT '(D) Mississipi', id FROM q UNION ALL
SELECT '(E) Danúbio', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é a capital da Argentina?','D',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Montevidéu', id FROM q UNION ALL
SELECT '(B) Santiago', id FROM q UNION ALL
SELECT '(C) Lima', id FROM q UNION ALL
SELECT '(D) Buenos Aires', id FROM q UNION ALL
SELECT '(E) Assunção', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual bioma é predominante na região Norte do Brasil?','E',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Cerrado', id FROM q UNION ALL
SELECT '(B) Caatinga', id FROM q UNION ALL
SELECT '(C) Pampa', id FROM q UNION ALL
SELECT '(D) Mata Atlântica', id FROM q UNION ALL
SELECT '(E) Amazônia', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o país mais populoso do mundo?','A',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Índia', id FROM q UNION ALL
SELECT '(B) Brasil', id FROM q UNION ALL
SELECT '(C) Rússia', id FROM q UNION ALL
SELECT '(D) Japão', id FROM q UNION ALL
SELECT '(E) Canadá', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual estado brasileiro tem como capital Salvador?','B',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Pernambuco', id FROM q UNION ALL
SELECT '(B) Bahia', id FROM q UNION ALL
SELECT '(C) Ceará', id FROM q UNION ALL
SELECT '(D) Sergipe', id FROM q UNION ALL
SELECT '(E) Alagoas', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é a montanha mais alta do mundo?','C',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Aconcágua', id FROM q UNION ALL
SELECT '(B) Kilimanjaro', id FROM q UNION ALL
SELECT '(C) Everest', id FROM q UNION ALL
SELECT '(D) Alpes', id FROM q UNION ALL
SELECT '(E) Himalaia', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual instrumento é usado para orientação geográfica?','D',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Régua', id FROM q UNION ALL
SELECT '(B) Transferidor', id FROM q UNION ALL
SELECT '(C) Bússola térmica', id FROM q UNION ALL
SELECT '(D) Bússola', id FROM q UNION ALL
SELECT '(E) Termômetro', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o menor continente em extensão territorial?','E',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) África', id FROM q UNION ALL
SELECT '(B) Europa', id FROM q UNION ALL
SELECT '(C) América', id FROM q UNION ALL
SELECT '(D) Ásia', id FROM q UNION ALL
SELECT '(E) Oceania', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é a capital da França?','A',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Paris', id FROM q UNION ALL
SELECT '(B) Lisboa', id FROM q UNION ALL
SELECT '(C) Roma', id FROM q UNION ALL
SELECT '(D) Berlim', id FROM q UNION ALL
SELECT '(E) Madri', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual região do Brasil é conhecida pelo Pantanal?','B',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Nordeste', id FROM q UNION ALL
SELECT '(B) Centro-Oeste', id FROM q UNION ALL
SELECT '(C) Sul', id FROM q UNION ALL
SELECT '(D) Norte', id FROM q UNION ALL
SELECT '(E) Sudeste', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é a capital do Japão?','C',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Pequim', id FROM q UNION ALL
SELECT '(B) Seul', id FROM q UNION ALL
SELECT '(C) Tóquio', id FROM q UNION ALL
SELECT '(D) Osaka', id FROM q UNION ALL
SELECT '(E) Kyoto', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'O deserto do Saara está localizado em qual continente?','D',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Ásia', id FROM q UNION ALL
SELECT '(B) Europa', id FROM q UNION ALL
SELECT '(C) América', id FROM q UNION ALL
SELECT '(D) África', id FROM q UNION ALL
SELECT '(E) Oceania', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o estado brasileiro mais ao sul do país?','E',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Paraná', id FROM q UNION ALL
SELECT '(B) Santa Catarina', id FROM q UNION ALL
SELECT '(C) São Paulo', id FROM q UNION ALL
SELECT '(D) Minas Gerais', id FROM q UNION ALL
SELECT '(E) Rio Grande do Sul', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual fenômeno natural é medido pela escala Richter?','A',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) terremoto', id FROM q UNION ALL
SELECT '(B) furacão', id FROM q UNION ALL
SELECT '(C) chuva', id FROM q UNION ALL
SELECT '(D) seca', id FROM q UNION ALL
SELECT '(E) temperatura', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é a capital do estado de Minas Gerais?','B',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Vitória', id FROM q UNION ALL
SELECT '(B) Belo Horizonte', id FROM q UNION ALL
SELECT '(C) Goiânia', id FROM q UNION ALL
SELECT '(D) Cuiabá', id FROM q UNION ALL
SELECT '(E) Curitiba', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual é o principal tipo de clima da região amazônica?','C',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) polar', id FROM q UNION ALL
SELECT '(B) árido', id FROM q UNION ALL
SELECT '(C) equatorial', id FROM q UNION ALL
SELECT '(D) mediterrâneo', id FROM q UNION ALL
SELECT '(E) temperado', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual país faz fronteira com o Brasil ao sul e tem Montevidéu como capital?','D',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Chile', id FROM q UNION ALL
SELECT '(B) Paraguai', id FROM q UNION ALL
SELECT '(C) Bolívia', id FROM q UNION ALL
SELECT '(D) Uruguai', id FROM q UNION ALL
SELECT '(E) Peru', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual mapa representa melhor uma pequena área com muitos detalhes?','E',1,1,1,1,DEFAULT,1,NULL,NULL,3,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) mapa-múndi', id FROM q UNION ALL
SELECT '(B) planisfério', id FROM q UNION ALL
SELECT '(C) mapa continental', id FROM q UNION ALL
SELECT '(D) mapa hemisférico', id FROM q UNION ALL
SELECT '(E) planta', id FROM q;

-- =========================================================
-- HISTÓRIA (76 a 100)
-- =========================================================

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem foi o primeiro presidente do Brasil?','C',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Getúlio Vargas', id FROM q UNION ALL
SELECT '(B) Juscelino Kubitschek', id FROM q UNION ALL
SELECT '(C) Deodoro da Fonseca', id FROM q UNION ALL
SELECT '(D) Floriano Peixoto', id FROM q UNION ALL
SELECT '(E) Dom Pedro II', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Em que ano o Brasil foi descoberto pelos portugueses?','A',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1500', id FROM q UNION ALL
SELECT '(B) 1492', id FROM q UNION ALL
SELECT '(C) 1822', id FROM q UNION ALL
SELECT '(D) 1889', id FROM q UNION ALL
SELECT '(E) 1530', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem proclamou a Independência do Brasil?','B',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Dom João VI', id FROM q UNION ALL
SELECT '(B) Dom Pedro I', id FROM q UNION ALL
SELECT '(C) Tiradentes', id FROM q UNION ALL
SELECT '(D) Deodoro da Fonseca', id FROM q UNION ALL
SELECT '(E) Getúlio Vargas', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Em que ano foi proclamada a República no Brasil?','D',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1822', id FROM q UNION ALL
SELECT '(B) 1500', id FROM q UNION ALL
SELECT '(C) 1930', id FROM q UNION ALL
SELECT '(D) 1889', id FROM q UNION ALL
SELECT '(E) 1964', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem foi Tiradentes?','E',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Um imperador', id FROM q UNION ALL
SELECT '(B) Um presidente', id FROM q UNION ALL
SELECT '(C) Um navegador', id FROM q UNION ALL
SELECT '(D) Um rei', id FROM q UNION ALL
SELECT '(E) Um líder da Inconfidência Mineira', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A escravidão no Brasil foi abolida em:','A',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1888', id FROM q UNION ALL
SELECT '(B) 1822', id FROM q UNION ALL
SELECT '(C) 1500', id FROM q UNION ALL
SELECT '(D) 1889', id FROM q UNION ALL
SELECT '(E) 1930', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual documento aboliu oficialmente a escravidão no Brasil?','B',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Constituição', id FROM q UNION ALL
SELECT '(B) Lei Áurea', id FROM q UNION ALL
SELECT '(C) Código Civil', id FROM q UNION ALL
SELECT '(D) Tratado Real', id FROM q UNION ALL
SELECT '(E) Carta Magna', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem assinou a Lei Áurea?','C',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Dom Pedro I', id FROM q UNION ALL
SELECT '(B) Dom Pedro II', id FROM q UNION ALL
SELECT '(C) Princesa Isabel', id FROM q UNION ALL
SELECT '(D) Dona Leopoldina', id FROM q UNION ALL
SELECT '(E) Carlota Joaquina', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem chegou ao Brasil em 1500?','D',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Cristóvão Colombo', id FROM q UNION ALL
SELECT '(B) Vasco da Gama', id FROM q UNION ALL
SELECT '(C) Fernão de Magalhães', id FROM q UNION ALL
SELECT '(D) Pedro Álvares Cabral', id FROM q UNION ALL
SELECT '(E) Pero Vaz de Caminha', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A Independência do Brasil ocorreu em:','E',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1500', id FROM q UNION ALL
SELECT '(B) 1889', id FROM q UNION ALL
SELECT '(C) 1930', id FROM q UNION ALL
SELECT '(D) 1808', id FROM q UNION ALL
SELECT '(E) 1822', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual povo construiu as pirâmides?','A',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Egípcios', id FROM q UNION ALL
SELECT '(B) Gregos', id FROM q UNION ALL
SELECT '(C) Romanos', id FROM q UNION ALL
SELECT '(D) Astecas', id FROM q UNION ALL
SELECT '(E) Maias', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem foi Júlio César?','B',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Um faraó', id FROM q UNION ALL
SELECT '(B) Um líder romano', id FROM q UNION ALL
SELECT '(C) Um rei francês', id FROM q UNION ALL
SELECT '(D) Um navegador português', id FROM q UNION ALL
SELECT '(E) Um filósofo grego', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A Primeira Guerra Mundial começou em:','C',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1939', id FROM q UNION ALL
SELECT '(B) 1918', id FROM q UNION ALL
SELECT '(C) 1914', id FROM q UNION ALL
SELECT '(D) 1945', id FROM q UNION ALL
SELECT '(E) 1900', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A Segunda Guerra Mundial terminou em:','D',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1939', id FROM q UNION ALL
SELECT '(B) 1940', id FROM q UNION ALL
SELECT '(C) 1944', id FROM q UNION ALL
SELECT '(D) 1945', id FROM q UNION ALL
SELECT '(E) 1950', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem era o líder da Alemanha nazista?','E',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Mussolini', id FROM q UNION ALL
SELECT '(B) Stalin', id FROM q UNION ALL
SELECT '(C) Churchill', id FROM q UNION ALL
SELECT '(D) Roosevelt', id FROM q UNION ALL
SELECT '(E) Hitler', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A Revolução Francesa começou em:','A',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1789', id FROM q UNION ALL
SELECT '(B) 1808', id FROM q UNION ALL
SELECT '(C) 1776', id FROM q UNION ALL
SELECT '(D) 1815', id FROM q UNION ALL
SELECT '(E) 1700', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem era conhecido como "Pai dos Pobres" no Brasil?','B',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Juscelino Kubitschek', id FROM q UNION ALL
SELECT '(B) Getúlio Vargas', id FROM q UNION ALL
SELECT '(C) Deodoro da Fonseca', id FROM q UNION ALL
SELECT '(D) Tancredo Neves', id FROM q UNION ALL
SELECT '(E) Itamar Franco', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem foi Dom Pedro II?','C',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Primeiro presidente do Brasil', id FROM q UNION ALL
SELECT '(B) Descobridor do Brasil', id FROM q UNION ALL
SELECT '(C) Segundo imperador do Brasil', id FROM q UNION ALL
SELECT '(D) Líder da Inconfidência', id FROM q UNION ALL
SELECT '(E) Governador-geral', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'A chegada da família real portuguesa ao Brasil ocorreu em:','D',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) 1500', id FROM q UNION ALL
SELECT '(B) 1822', id FROM q UNION ALL
SELECT '(C) 1889', id FROM q UNION ALL
SELECT '(D) 1808', id FROM q UNION ALL
SELECT '(E) 1930', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual civilização antiga é conhecida pela democracia em Atenas?','E',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Egípcia', id FROM q UNION ALL
SELECT '(B) Romana', id FROM q UNION ALL
SELECT '(C) Persa', id FROM q UNION ALL
SELECT '(D) Fenícia', id FROM q UNION ALL
SELECT '(E) Grega', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem escreveu a carta relatando o descobrimento do Brasil?','A',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Pero Vaz de Caminha', id FROM q UNION ALL
SELECT '(B) Pedro Álvares Cabral', id FROM q UNION ALL
SELECT '(C) Dom João VI', id FROM q UNION ALL
SELECT '(D) Tiradentes', id FROM q UNION ALL
SELECT '(E) José Bonifácio', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Quem foi José Bonifácio na história do Brasil?','B',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Primeiro presidente', id FROM q UNION ALL
SELECT '(B) Patriarca da Independência', id FROM q UNION ALL
SELECT '(C) Imperador do Brasil', id FROM q UNION ALL
SELECT '(D) Descobridor', id FROM q UNION ALL
SELECT '(E) Escritor da Lei Áurea', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual período antecede a História e é marcado pela ausência de escrita?','C',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Idade Antiga', id FROM q UNION ALL
SELECT '(B) Idade Média', id FROM q UNION ALL
SELECT '(C) Pré-História', id FROM q UNION ALL
SELECT '(D) Idade Moderna', id FROM q UNION ALL
SELECT '(E) Idade Contemporânea', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual evento marcou o início da Idade Média?','D',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Descobrimento do Brasil', id FROM q UNION ALL
SELECT '(B) Revolução Francesa', id FROM q UNION ALL
SELECT '(C) Independência do Brasil', id FROM q UNION ALL
SELECT '(D) Queda do Império Romano do Ocidente', id FROM q UNION ALL
SELECT '(E) Primeira Guerra Mundial', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual evento marcou o fim da Idade Média?','E',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) Queda do Império Romano', id FROM q UNION ALL
SELECT '(B) Lei Áurea', id FROM q UNION ALL
SELECT '(C) Revolução Industrial', id FROM q UNION ALL
SELECT '(D) Independência dos EUA', id FROM q UNION ALL
SELECT '(E) Queda de Constantinopla', id FROM q;

WITH q AS (
  INSERT INTO blog.questao VALUES (DEFAULT,'Qual era o sistema de trabalho predominante no feudalismo?','A',1,1,1,1,DEFAULT,1,NULL,NULL,4,true) RETURNING id
)
INSERT INTO blog.alternativas (alternativa, questaoid)
SELECT '(A) servidão', id FROM q UNION ALL
SELECT '(B) assalariado', id FROM q UNION ALL
SELECT '(C) industrial', id FROM q UNION ALL
SELECT '(D) terceirizado', id FROM q UNION ALL
SELECT '(E) voluntário', id FROM q;

commit;


-- select * from alternativas;
--