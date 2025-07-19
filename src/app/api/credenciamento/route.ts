import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseClient';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { nome, cpf, email, telefone } = body;

    
    if (!nome || !cpf || !email || !telefone) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    
    const docRef = await addDoc(collection(db, "credenciados"), {
      nome,
      cpf,
      email,
      telefone,
      created_at: serverTimestamp(), 
    });

    return NextResponse.json({ message: 'Credenciamento realizado com sucesso!', id: docRef.id }, { status: 201 });

  } catch (error: any) {
    console.error('Erro no credenciamento:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}