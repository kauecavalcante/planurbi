// src/app/api/perguntas/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebaseClient'; // Reutilizando sua configuração existente!
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const { name, email, question } = await req.json();

    // Validação simples no servidor
    if (!name || !email || !question) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    // Adiciona o documento à coleção 'perguntas' no Firestore
    const docRef = await addDoc(collection(db, 'perguntas-seminario'), {
      name,
      email,
      question,
      createdAt: serverTimestamp(), // Adiciona um timestamp de quando foi criado
      status: 'recebida', // Um status inicial para controle
    });

    console.log("Pergunta salva com o ID: ", docRef.id);

    return NextResponse.json({ message: 'Pergunta enviada com sucesso!', id: docRef.id }, { status: 201 });

  } catch (error) {
    console.error('Erro ao salvar pergunta no Firebase:', error);
    // Em um erro, retorna uma mensagem genérica para o cliente
    return NextResponse.json({ error: 'Ocorreu um erro ao enviar sua pergunta.' }, { status: 500 });
  }
}