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


export async function GET() {
  try {
    const credenciadosRef = db.collection('credenciados');
    const snapshot = await credenciadosRef.orderBy('nome').get();

    if (snapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const participantes = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        nome: data.nome,
        telefone: data.telefone,
      };
    });

    return NextResponse.json(participantes, { status: 200 });

  } catch (error) {
    console.error('Erro ao buscar participantes:', error);
    const message = error instanceof Error ? error.message : 'Erro interno do servidor.';
    return NextResponse.json({ message }, { status: 500 });
  }
}