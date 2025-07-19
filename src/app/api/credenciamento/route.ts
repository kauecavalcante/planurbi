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
    const { nome, cpf, email, telefone } = body;

    if (!nome || !cpf || !email || !telefone) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const cleanCpf = cpf.replace(/\D/g, '');
    const cleanTelefone = telefone.replace(/\D/g, '');

    const cpfRef = db.collection('cpfs').doc(cleanCpf);
    const telefoneRef = db.collection('telefones').doc(cleanTelefone);
    const novoCredenciadoRef = db.collection('credenciados').doc();

    await db.runTransaction(async (transaction) => {
      const cpfDoc = await transaction.get(cpfRef);
      if (cpfDoc.exists) {
        throw new Error('Este CPF já está cadastrado.');
      }

      const telefoneDoc = await transaction.get(telefoneRef);
      if (telefoneDoc.exists) {
        throw new Error('Este telefone já está cadastrado.');
      }

      const novoCredenciado = {
        nome,
        cpf: cleanCpf,
        email,
        telefone: cleanTelefone,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
      
        accepted_terms_at: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      transaction.set(novoCredenciadoRef, novoCredenciado);
      transaction.set(cpfRef, { userId: novoCredenciadoRef.id });
      transaction.set(telefoneRef, { userId: novoCredenciadoRef.id });
    });

    return NextResponse.json({ message: 'Credenciamento realizado com sucesso!' }, { status: 201 });

  } catch (error) {
    console.error('Erro na transação de credenciamento:', error);
    
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    
    if (message.includes('CPF') || message.includes('telefone')) {
        return NextResponse.json({ message }, { status: 409 });
    }

    return NextResponse.json({ message }, { status: 500 });
  }
}