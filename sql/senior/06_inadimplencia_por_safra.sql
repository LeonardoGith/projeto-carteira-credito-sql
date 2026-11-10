-- 06. Inadimplência por safra
-- Pedido: Agrupe os contratos pela safra (trimestre de início). Em 2026-10-31: quantos estão expostos (alguma parcela vencida), quantos têm parcela vencida há mais de 30 dias sem pagamento e a taxa.
-- Colunas, nesta ordem: safra, expostos, inad_30, taxa_pct
-- Atenção: safra é o primeiro dia do trimestre. taxa_pct = inad_30 ÷ expostos × 100, com 2 casas. Ordene pela safra.
-- Escreva uma única consulta abaixo. Teste na sua IDE e depois rode: npm run test:senior

