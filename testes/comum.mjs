// Funções usadas pela correção. Elas transformam o resultado de uma consulta numa
// "impressão digital" (hash). Assim dá para conferir a resposta sem guardar a resposta.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";

// Devolve todos os valores como texto, do jeito que o PostgreSQL escreve.
const comoTexto = (x) => x;
const TIPOS = [16, 20, 21, 23, 700, 701, 1082, 1083, 1114, 1184, 1700];
export const PARSERS = Object.fromEntries(TIPOS.map((t) => [t, comoTexto]));

export async function abrirBase(arquivo) {
  const db = new PGlite({ parsers: PARSERS });
  await db.exec(readFileSync(arquivo, "utf8"));
  return db;
}

// Números viram texto com 2 casas: 24802.4615 e 24802.46 contam como iguais.
export function normalizarValor(v) {
  if (v === null || v === undefined) return "NULL";
  const s = String(v).trim();
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s).toFixed(2);
  return s;
}

const hash = (x) => createHash("sha256").update(JSON.stringify(x)).digest("hex").slice(0, 24);

export function impressao(colunas, linhas) {
  const normal = linhas.map((l) => colunas.map((c) => normalizarValor(l[c])));
  const ordenadas = normal.map((l) => JSON.stringify(l)).sort();
  const porColuna = {};
  colunas.forEach((c, i) => { porColuna[c] = hash(normal.map((l) => l[i]).sort()); });
  return {
    colunas: colunas.map((c) => c.toLowerCase()),
    linhas: normal.length,
    emOrdem: hash(normal),
    conjunto: hash(ordenadas),
    porColuna,
  };
}

// Roda a consulta só para leitura: um DELETE ou UPDATE dá erro, e nada muda na base.
export async function rodar(db, sql) {
  await db.exec("BEGIN READ ONLY");
  try {
    const r = await db.query(sql);
    return { colunas: r.fields.map((f) => f.name), linhas: r.rows };
  } finally {
    await db.exec("ROLLBACK");
  }
}

// Tira comentários para saber se o arquivo ainda está vazio.
export function semComentarios(sql) {
  return sql.replace(/\/\*[\s\S]*?\*\//g, "").replace(/--.*$/gm, "").trim();
}
