-- 08. Tabela do modelo de risco
-- Pedido: Uma linha por cliente com contrato: quantos contratos, a proporção de contratos inadimplentes, o maior atraso em dias e se usou o app.
-- Colunas, nesta ordem: cliente_id, contratos, prop_inadimplente, maior_atraso_dias, usou_app
-- Atenção: prop_inadimplente com 4 casas. maior_atraso_dias considera as parcelas vencidas até 2026-10-31, usando 2026-10-31 para as não pagas, e fica 0 para quem nunca atrasou. usou_app é 'sim' ou 'nao'.
-- Escreva uma única consulta abaixo. Teste na sua IDE e depois rode: npm run test:senior

