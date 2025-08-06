import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';

// A sua configuração do Firebase Admin continua a mesma
const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nome, data_nascimento, rg, email, // Adicionado o campo email
      rua, numero, complemento, cep, cidade, estado, 
      tipo_instituicao, instituicao, serie_ano
    } = body;

    // Adicionada a validação para o campo email
    if (!nome || !data_nascimento || !rg || !email || !rua || !numero || !cep || !cidade || !estado || !tipo_instituicao || !instituicao || !serie_ano) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios, exceto o complemento.' }, { status: 400 });
    }

    // Verificação de RG duplicado (existente)
    const rgQuery = await db.collection("selecao_campo").where("rg", "==", rg).limit(1).get();
    if (!rgQuery.empty) {
      // Adicionado 'field' para o frontend saber qual campo deu erro
      return NextResponse.json({ message: 'Este RG já foi cadastrado.', field: 'rg' }, { status: 409 });
    }

    // --- NOVO TRECHO: Verificação de e-mail duplicado ---
    const emailQuery = await db.collection("selecao_campo").where("email", "==", email).limit(1).get();
    if (!emailQuery.empty) {
      return NextResponse.json({ message: 'Este e-mail já foi cadastrado.', field: 'email' }, { status: 409 });
    }
    // --- FIM DO NOVO TRECHO ---

    const docRef = await db.collection("selecao_campo").add({
      nome,
      data_nascimento,
      rg,
      email, // Adicionado o email ao documento do Firestore
      endereco: { rua, numero, complemento, cep, cidade, estado },
      tipo_instituicao,
      instituicao,
      serie_ano,
      edital_accepted_at: admin.firestore.FieldValue.serverTimestamp(),
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ message: 'Inscrição realizada com sucesso!', id: docRef.id }, { status: 201 });

  } catch (error) {
    console.error('Erro na inscrição para seleção:', error);
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
