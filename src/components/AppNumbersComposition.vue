<template>
    <div class="border-4 border-black p-6 bg-white rounded w-full">
        <h1 class="mb-4 text-2xl font-black">Подключение к Firebase методом Composition API</h1>

        <button type="button" @click="createDocument"> Add </button>

        <table>
            <tbody>
                <tr v-for="doc in documents" :key="doc.id">
                    <td>
                        {{ doc.num }}
                    </td>
                    <td>
                        <button type="button"
                             @click="updateDocument(doc.id)"> Update
                        </button>
                        <span> ----  </span>
                        <button type="button" 
                            @click="deleteDocument(doc.id)"> Remove
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { useCollection } from 'vuefire';
import { db, numbersRef } from '../firebase';

const documents = useCollection(numbersRef);

async function createDocument() {
    const newDocument = { num: Math.round(Math.random() * 100) };

    await addDoc(numbersRef, newDocument);
}

async function updateDocument(id) {
    const newDocument = { num: Math.round(Math.random() * 100) };
    const docRef = doc(db, 'numbers', id);

    await updateDoc(docRef, newDocument);
}

async function deleteDocument(id) {
    await deleteDoc(doc(db, 'numbers', id));
}
</script>
