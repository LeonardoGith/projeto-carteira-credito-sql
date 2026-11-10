// Correção automática do projeto. Roda no GitHub Actions a cada push e no seu computador com
// `npm test` (etapa Júnior) ou `npm run test:pleno` (etapa Pleno).
// Para cada arquivo da etapa, executa a consulta na base e compara com a impressão digital esperada.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { abrirBase, impressao, rodar, semComentarios } from "./comum.mjs";

const raiz = new URL("../", import.meta.url);
const ETAPAS = {
  junior: { esperado: "testes/esperado.json", pasta: "sql/", relatorio: ["README.md", "docs/decisoes.md"] },
  pleno: { esperado: "testes/esperado-pleno.json", pasta: "sql/pleno/", relatorio: ["docs/pleno.md"] },
};
const i = process.argv.indexOf("--etapa");
const nomeEtapa = i >= 0 ? process.argv[i + 1] : "junior";
const etapa = ETAPAS[nomeEtapa];
if (!etapa) { console.log(`Etapa desconhecida: ${nomeEtapa}. Use junior ou pleno.`); process.exit(1); }
const esperado = JSON.parse(readFileSync(new URL(etapa.esperado, raiz), "utf8"));
const db = await abrirBase(new URL("dados/base.sql", raiz));
mkdirSync(new URL(`resultados/${etapa.pasta.replace(/^sql\//, "")}`, raiz), { recursive: true });

const csv = (colunas, linhas) => [colunas.join(";"), ...linhas.map((l) => colunas.map((c) => {
  const v = l[c] === null || l[c] === undefined ? "" : String(l[c]);
  return /[;"\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}).join(";"))].join("\n") + "\n";

let certas = 0;
const total = Object.keys(esperado.perguntas).length + 1;
const linhasRelatorio = [];
const resultado = (ok, nome, msg) => {
  if (ok) certas++;
  const linha = `${ok ? "✅" : "❌"} ${nome}${msg ? ` — ${msg}` : ""}`;
  linhasRelatorio.push(linha);
  console.log(linha);
};

console.log(`\nCorreção do projeto · etapa ${esperado.etapa}\n`);

for (const [nome, e] of Object.entries(esperado.perguntas)) {
  const arquivo = new URL(`${etapa.pasta}${nome}.sql`, raiz);
  if (!existsSync(arquivo)) { resultado(false, nome, `o arquivo ${etapa.pasta}${nome}.sql sumiu`); continue; }
  const sql = readFileSync(arquivo, "utf8");
  if (!semComentarios(sql)) { resultado(false, nome, "ainda sem resposta"); continue; }

  let r;
  try {
    r = await rodar(db, sql);
  } catch (erro) {
    const msg = String(erro.message || erro).split("\n")[0];
    resultado(false, nome, /multiple|cannot insert multiple/i.test(msg)
      ? "deixe só uma consulta no arquivo"
      : `a consulta deu erro: ${msg}`);
    continue;
  }
  writeFileSync(new URL(`resultados/${etapa.pasta.replace(/^sql\//, "")}${nome}.csv`, raiz), csv(r.colunas, r.linhas));

  const recebido = impressao(r.colunas, r.linhas);
  if (JSON.stringify(recebido.colunas) !== JSON.stringify(e.colunas)) {
    resultado(false, nome, `as colunas devem ser, nesta ordem: ${e.colunas.join(", ")} (vieram: ${recebido.colunas.join(", ") || "nenhuma"})`);
    continue;
  }
  if (recebido.linhas !== e.linhas) {
    resultado(false, nome, `vieram ${recebido.linhas} linhas, mas a resposta tem ${e.linhas}`);
    continue;
  }
  if (recebido.conjunto !== e.conjunto) {
    const erradas = e.colunas.filter((c) => recebido.porColuna[c] !== e.porColuna[c]);
    resultado(false, nome, erradas.length
      ? `a quantidade de linhas está certa, mas os valores não batem em: ${erradas.join(", ")}`
      : "cada coluna tem os valores certos, mas eles estão combinados em linhas erradas (confira o JOIN ou o GROUP BY)");
    continue;
  }
  if (e.ordenado && recebido.emOrdem !== e.emOrdem) {
    resultado(false, nome, "as linhas estão certas, mas fora da ordem pedida");
    continue;
  }
  resultado(true, nome);
}

// O relatório escrito também faz parte do projeto.
const marcador = "✏️";
const pendentes = etapa.relatorio.filter((f) => readFileSync(new URL(f, raiz), "utf8").includes(marcador));
resultado(pendentes.length === 0, "relatorio_escrito",
  pendentes.length ? `ainda há trechos marcados com ${marcador} para você escrever em: ${pendentes.join(", ")}` : "");

console.log(`\n${certas} de ${total} itens certos.`);
if (process.env.GITHUB_STEP_SUMMARY) {
  writeFileSync(process.env.GITHUB_STEP_SUMMARY,
    `## Correção do projeto · etapa ${esperado.etapa}\n\n**${certas} de ${total} itens certos.**\n\n${linhasRelatorio.map((l) => `- ${l}`).join("\n")}\n`,
    { flag: "a" });
}
if (certas < total) {
  console.log("Ainda não está completo. Ajuste os itens com ❌ e rode de novo.\n");
  process.exit(1);
}
console.log("Projeto completo! 🎉\n");
