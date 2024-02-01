<template>
  <h4>Требования здесь не редактируются</h4>
  <!--? данные таблицы -->
  <v-data-table
    :headers="headers"
    :items="talentsD"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    v-model:search="search"
    items-per-page-text="Показывать по"
  >
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

              <v-textarea
                v-model="editedItem.requirements"
                label="Требование"
                maxlength="200"
                counter
                auto-grow
                rows="1"
                disabled=""
              ></v-textarea>
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
      <div v-for="(req, i) in item.requirements">
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
    <!--* кнопка обновить когда пусто-->
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
// без этого импорта норм
// import { computed, nextTick, ref, watch } from "vue";

//========= Функции работы с БД
const talentsD = ref(null);
// получаем массив из бд
talentsD.value = await getTalents();

async function getTalents() {
  return await $fetch("/api/w_talent");
}

// удаляем юзера из бд
async function deleteTalents(id) {
  return await $fetch("/api/w_talent", {
    method: "DELETE",
    body: {
      id: id,
    },
  });
}

// добавляем юзера в бд
async function addTalents(newtalent) {
  let addtal = null

  if (newtalent) addtal = await $fetch("/api/w_talent", {
    method: "POST",
    body: {
      name: newtalent.name,
      description: newtalent.description,
      //requirements:newtalent.requirements,
    },
  });

  if (addtal) talentsD.value = await getTalents()
}

// редактируем юзера в бд
async function editTalents(edtalent) {
  let edtal = null

  if (edtalent) edtal = await $fetch("/api/w_talent", {
    method: "PUT",
    body: {
      id: edtalent.id,
      name: edtalent.name,
      description: edtalent.description,
    },
  });

  if (edtal) talentsD.value = await getTalents()
}

//==================
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

// Редактирование
const desserts = ref([]);
const editedIndex = ref(-1);
const deletedIndex = ref();
const editedItem = ref({
  name: "",
  description: "",
  requirements: "",
});
const defaultItem = ref({
  name: "",
  description: "",
  requirements: "",
});
const formTitle = computed(() => {
  return editedIndex.value === -1 ? "Новая запись" : "Редактирование";
});

//---------

function initialize() {
  desserts.value = [
    {
      name: "Frozen Yogurt",
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,
    },
  ];
}

function editItem(item) {
  editedIndex.value = talentsD.value.indexOf(item);
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

//4 подтверждаем делете
function deleteItemConfirm() {
  //* Удаляем запись из базы

  deleteTalents(deletedIndex.value);

  // Удаляем запись из массива Talentsd для обновления на экране
  talentsD.value.splice(editedIndex.value, 1);

  //5 вызываем делете
  closeDelete();
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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

 //================
function save() {
  if (editedIndex.value > -1) {
    Object.assign(talentsD.value[editedIndex.value], editedItem.value);
    console.log('editItem.value=', editedItem.value);
    editTalents(editedItem.value);
  } else {
     console.log('editedIndex.value=', editedIndex.value);
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
initialize();
</script>

<style scoped></style>
