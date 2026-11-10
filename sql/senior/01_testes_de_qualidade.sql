-- 01. Testes de qualidade
-- Pedido: Monte o painel de testes da base, uma linha por regra, com quantas violações cada uma tem: 1 'contrato sem parcela', 2 'contrato com parcelas faltando' (tem parcelas, mas menos que qtd_parcelas), 3 'linha repetida na carga bruta' (linhas a mais que parcelas distintas) e 4 'pagamento antes do início do contrato'.
-- Colunas, nesta ordem: ordem, regra, violacoes
-- Atenção: Os textos de regra são exatamente os de cima. Ordene por ordem.
-- Escreva uma única consulta abaixo. Teste na sua IDE e depois rode: npm run test:senior

