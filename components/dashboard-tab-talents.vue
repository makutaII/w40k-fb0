<template>
  <!--? данные таблицы -->
  <v-data-table
    :headers="headers"
    :items="talentsD"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    v-model:search="search"
   
      items-per-page= "-1"
     
     >
     <!-- page-text ="" -->
    <!--++ заголовок?-->
    <template v-slot:top>
      <!--++ диалог - новая запись bg-surface-variant-->
      <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ props }">
          <v-row justify-sm="space-between">
            <v-col cols="12" md="6">
              <!--* поле поиск  -->
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                density="compact"
                label="Поиск"
                single-line
                flat
                hide-details
                variant="solo-filled"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <!--* кнопка новая запись-->
              <v-btn class="float-right" color="primary" v-bind="props">
                Новая запись
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <!--++ окно новая\редактирование записи-->
        <v-card>
          <v-card-title>
            <!-- Редактирование или новая запись в зависимости от editedIndex в formTitle -->
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-text-field
                v-model="editedItem.name"
                label="Название"
              ></v-text-field>

              <v-textarea
                v-model="editedItem.description"
                label="Описание"
                maxlength="800"
                counter
                auto-grow
                rows="2"
              ></v-textarea>

              <!-- ! редактируем требование -->

              <v-card-text> Требование</v-card-text>

              <div v-for="(req, i) in editedItem.requirements">
                <v-row>
                  <v-textarea
                    v-model="req.name"
                    :label="'Требование ' + i"
                    rows="1"
                  >
                  </v-textarea>

                  <!--1 вызывает функцию  удалить требование -->
                  <v-icon
                    color="red"
                    size="small"
                    @click="deleteReqN(i, req.id, editedItem.requirements)"
                  >
                    mdi-delete
                  </v-icon>
                </v-row>
              </div>
              <!-- !---------добавляем требование -->
              <!-- !---------добавляем требование -->
              <v-card v-if="editedItem.id" class="">
                <v-row class="mx-3 mt-3">
                  <v-col class="pa-1"  cols="auto">
                    <v-card-text class="pa-0">{{ editedItem.id }}</v-card-text>
                  </v-col>
                  <v-textarea
                    v-model="editedReqItem.name"
                    label="Описание"
                    counter
                    auto-grow
                    rows="1"
                  ></v-textarea>

                  <!--* кнопка новое требование-->
                  <v-icon
                    color="green"
                    @click="
                      addRequirement(
                        editedReqItem.name,
                        editedItem.id,
                        editedItem.requirements
                      )
                    "
                  >
                    mdi-plus
                  </v-icon>
                </v-row>
               
                  <v-card-text class="pt-0">Нажмите + справа для фиксации требования в БД</v-card-text>
              
              </v-card>
              <v-card v-else class="pa-2">
                <v-text
                  >Добавить требования можно только к уже созданным
                  талантам</v-text
                >
              </v-card>

              <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
            </v-container>
          </v-card-text>

          <!--* кнопка выход\ сохранить-->
          <!--! сохранем или отмена-->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
              Отмена
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="save">
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--++ диалог - удалить запись-->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">Уверен?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!--* 5 если нет, то вызываем  closeDelete -->

            <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
              >Отмена</v-btn
            >
            <!--*  4 если да, то вызываем  deleteItemConfirm -->
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <!--? Таблица-->
    <!--* изменяем нужные поля  -->
    <!-- с большой буквы name -->
    <template v-slot:item.name="{ item }">
      <p class="text-capitalize">
        {{ item.name }}
      </p>
    </template>

    <!-- требования показываем только name -->
    <template v-slot:item.requirements="{ item }">
      <div class="border-b" v-for="(req, i) in item.requirements">
        {{ req.name }}
      </div>
    </template>

    <!--* кнопки удалить\редактировать-->
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <!--1 вызывает функцию  deleteItem(item) , где итем - это запись из talentsD-->
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
   <template v-slot:bottom>
      <div class="text-center pt-2">
        Всего 
{{ talentsD.length }}
      </div>
    </template>

  </v-data-table>
</template>

<script setup>
//? ========================== КОНСТАНТЫ ==================

const search = ref("");
const dialog = ref(false);
const dialogDelete = ref(false);

const headers = ref([
  { title: "Id", key: "id" },
  {
    title: "Талант",
    align: "start",
    key: "name",
  },
  { title: "Описание", key: "description" },
  { title: "Требования", key: "requirements" },
  { title: "Изменить", key: "actions", sortable: false },
]);

//++ конст редактирования
const editedReqIndex = ref(-1);
const deletedIndex = ref();
const editedIndex = ref(-1);
const editedItem = ref({
  name: "",
  description: "",
  requirements: "",
});
const editedReqItem = ref({
  name: "",
  talent_id: "",
});
const defaultItem = ref({
  name: "",
  description: "",
  requirements: "",
});
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Новая запись" : "Редактирование";
});

//?========= Функции работы с БД==========
//?=======================================

const talentsD = ref(null);
//* получаем массив из бд
talentsD.value = await getTalents();

async function getTalents() {
  return await $fetch("/api/w_talent");
}

//* удаляем талант из бд
async function deleteTalents(id) {
  return await $fetch("/api/w_talent", {
    method: "DELETE",
    body: {
      id: id,
    },
  });
}

//* добавляем талант в бд
async function addTalents(newtalent) {
  let addtal = null;

  if (newtalent)
    addtal = await $fetch("/api/w_talent", {
      method: "POST",
      body: {
        name: newtalent.name,
        description: newtalent.description,
        //requirements:newtalent.requirements,
      },
    });

  if (addtal) talentsD.value = await getTalents();
}

//! добавляем требование в бд
async function addRequirement(name, tal_id, ediq) {
  let addtal = null;
  let ledq = {
    name: name,
    talent_id: tal_id,
  };
  ediq.push(ledq);
  addtal = await $fetch("/api/w_requirement", {
    method: "POST",
    body: {
      name: name,
      talent_id: tal_id,
    },
  });

  //if (addtal) talentsD.value = await getTalents();
}
//! редактируем требование в бд

async function editRequirement(editreq) {
  let edreq = null;
  edreq = await $fetch("/api/w_requirement", {
    method: "PUT",
    body: {
      id: editreq.id,
      name: editreq.name,
      talent_id: editreq.talent_id,
    },
  });

  //if (addtal) talentsD.value = await getTalents();
}
//* редактируем юзера в бд
async function editTalents(edtalent) {
  let edtal = null;

  if (edtalent)
    edtal = await $fetch("/api/w_talent", {
      method: "PUT",
      body: {
        id: edtalent.id,
        name: edtalent.name,
        description: edtalent.description,
      },
    });
  if (edtal) talentsD.value = await getTalents();
}

//++ Функции редактирования
function editItem(item) {
  editedIndex.value = talentsD.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

//* Удаление
function deleteItem(item) {
  //2 записали индекс(текущий) редактируемой записи в массиве talentsD
  editedIndex.value = talentsD.value.indexOf(item);

  // записали индекс(значение id поля) редактируемой записи
  deletedIndex.value = item.id;

  // console.log("item.id=", item.id);
  // console.log("deletedIndex.value=", deletedIndex.value);

  //2 записали пропсы редактируемой записи (попробовать удалить)
  editedItem.value = Object.assign({}, item);

  //3 открываем диалог делете
  dialogDelete.value = true;
}

//* 4 подтверждаем делете
function deleteItemConfirm() {
  // Удаляем запись из базы
  deleteTalents(deletedIndex.value);

  // Удаляем запись из массива Talentsd для обновления на экране
  talentsD.value.splice(editedIndex.value, 1);

  //5 вызываем делете
  closeDelete();
}

//* Удаление requirement
async function deleteReqN(i, id, edis) {
  edis.splice(i, 1);
  return await $fetch("/api/w_requirement", {
    method: "DELETE",
    body: {
      id: id,
    },
  });
}
//* удаляем requirement из бд. Объединил с удалением из массива
// async function deleteRequirement(id) {

//   return await $fetch("/api/w_requirement", {
//     method: "DELETE",
//     body: {
//       id: id,
//     },
//   });

// }

//* закрытие
function close() {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}
//5 закрываем диалог делете
function closeDelete() {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
}

//* Сохранение
function save() {
  let ee = null;

  if (editedIndex.value > -1) {
    Object.assign(talentsD.value[editedIndex.value], editedItem.value);
    //editTalents(editedItem.value);
    //!!!!!++++++++++++++++++++!!!!!!!!!!!!!!
    ee = editedItem.value.requirements;

    for (const element of editedItem.value.requirements) {
      editRequirement(element);
    }
  } else {
    talentsD.value.push(editedItem.value);
    addTalents(editedItem.value);
  }
  close();
}

watch(dialog, (val) => {
  val || close();
});
watch(dialogDelete, (val) => {
  val || closeDelete();
});
</script>

<style scoped></style>
