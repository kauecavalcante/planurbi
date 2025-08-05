import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';


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
      nome, data_nascimento, rg,
      rua, numero, complemento, cep, cidade, estado,
      tipo_instituicao, instituicao, serie_ano
    } = body;

    if (!nome || !data_nascimento || !rg || !rua || !numero || !cep || !cidade || !estado || !tipo_instituicao || !instituicao || !serie_ano) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios, exceto o complemento.' }, { status: 400 });
    }

    
    const rgQuery = await db.collection("selecao_campo").where("rg", "==", rg).limit(1).get();
    if (!rgQuery.empty) {
      return NextResponse.json({ message: 'Este RG já foi cadastrado.' }, { status: 409 }); // 409 Conflict
    }
    

    const docRef = await db.collection("selecao_campo").add({
      nome,
      data_nascimento,
      rg,
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