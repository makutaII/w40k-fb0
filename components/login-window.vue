<template>
  <div v-if="user">
    <!--  юзер есть-->
    <!--++ Mеню юзера после входа-->
    <v-menu>
      <!--?кнопка вызова окна входа с юзером-->
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" color="primary" icon="mdi-account"></v-btn>
      </template>

      <v-list width="200" :lines="false" density="compact" nav>
        <v-list-subheader>{{ user.email }}</v-list-subheader>
        <v-list-subheader>
          {{ user.role === "authenticated" ? "авторизован" : "админ" }}
        </v-list-subheader>

        <v-divider></v-divider>

        <!-- * профиль -->
        <v-list-item to="/user" color="primary">
          <template v-slot:append>
            <v-icon icon="mdi-account"></v-icon>
          </template>
          <v-list-item-title>Профиль</v-list-item-title>
        </v-list-item>

        <div v-if="user.role === 'admin'">
          <!-- * дашборд -->
          <v-list-item to="/dashboard" color="primary">
            <template v-slot:append>
              <v-icon icon="mdi-view-dashboard"></v-icon>
            </template>
            <v-list-item-title>Дашборд</v-list-item-title>
          </v-list-item>

          <!-- * Список -->
          <v-list-item to="/dashboard/todo" color="primary">
            <template v-slot:append>
              <v-icon icon="mdi-format-list-checks"></v-icon>
            </template>
            <v-list-item-title>Список</v-list-item-title>
          </v-list-item>

          <!-- * Ссылки -->
          <v-list-item
            v-for="(item, i) in items_menu"
            :value="item"
            :key="i"
            :to="item.to"
            :href="item.href"
            link
            target="blank"
            color="primary"
          >
            <template v-slot:append>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </div>

        <!-- * выйти -->
        <!-- Выйти пункт из списка итемов не работает(клик как сделать?) -->
        <v-list-item @click="userLogout" color="primary">
          <template v-slot:append>
            <v-icon icon="mdi-logout"></v-icon>
          </template>
          <v-list-item-title>Выйти</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

  <div v-else>
    <!--  юзера нет -->
    <!--?кнопка вызова окна входа до входа. -->

    <v-btn
      class="pl-0"
      color="primary"
      append-icon="mdi-login"
      variant="outlined"
      @click="dialog = true"
      ><p class="pl-3 d-none d-lg-block text-none">Войти</p></v-btn
    >
  </div>

  <!--++ окно входа-->
  <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialog">
    <v-card rounded="lg" elevation="8">
      <div class="d-flex justify-center ma-5">
        <v-img
          width="100"
          inline
          src="~assets/img/svg/imperial-aquila.svg"
        ></v-img>
        <v-card-title>Warhammer 40000</v-card-title>
      </div>
      <div class="d-flex align-center flex-column pb-6">
        <v-card-title class="text-h5 pa-4 font-weight-bold"
          >Добро пожаловать</v-card-title
        >
        <v-card-subtitle class="text-wrap text-center"
          >Войдите в систему, чтобы сохранить настройки и разблокировать
          эксклюзивные привилегии для подписчиков.</v-card-subtitle
        >
      </div>

      <!--++ форма для ввода пароля и мейла-->
      <v-form @submit.prevent="userLogin">
        <!--// bg-surface-variant -->
        <v-row align="center" justify="center" class="mx-4">
          <v-col cols="auto" class="mx-auto">
            <div class="text-medium-emphasis">Логин</div>
            <!--email-->
            <v-text-field
              density="compact"
              placeholder="Email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="email"
              id="email"
              name="email"
              type="email"
            ></v-text-field>

            <!--ссылка на забыл пароль -->
            <div
              class="text-medium-emphasis d-flex align-center justify-space-between"
            >
              Пароль
              <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                Забыли пароль? - не работает</a
              >
            </div>

            <!--password-->
            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Введите пароль"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              id="password"
              v-model="password"
              name="password"
            ></v-text-field>

            <!-- !кнопка submit-->
            <v-btn
              block
              class="mb-2"
              color="blue"
              size="large"
              variant="tonal"
              type="submit"
            >
              Вход
            </v-btn>
          </v-col>

          <!--! Вход с гуглом bg-surface-variant -->
          <v-col class="mr-4 border"
            >Войти с помощью Google аккаунта. Тут пока ничего нет</v-col
          >
          <!-- проверка на ошибку при входе -->
          <v-card-subtitle v-if="errorMsg"
            >Неверные учетные данные для входа / {{ errorMsg }}</v-card-subtitle
          >

          <!--? Ссылка на регистрацию -->
          <v-row align="center" justify="center" class="ma-2">
            <v-card-subtitle>Еще нет аккаунта?</v-card-subtitle>
            <v-btn
              color="blue"
              variant="text"
              class="text-none"
              @click="dialogReg = true"
            >
              Создать аккаунт
            </v-btn>
          </v-row>
        </v-row>
      </v-form>
      <!--++ форма для входа конец -->

      <v-card-text>
        <!--* форма из моего теста -->
        <!-- <nuxt-link to="/register">Register</nuxt-link> -->
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="dialog = false"> Закрыть 
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!--! диалог регистрации-->
  <v-dialog v-model="dialogReg" width="400">
    <v-card>
      <v-card-title> Регистрация </v-card-title>
      <v-card-text>
        <form @submit.prevent="userRegister">
          <!--email-->
          <v-text-field
            density="compact"
            placeholder="Email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            v-model="email"
            id="email"
            name="email"
            type="email"
          ></v-text-field>

          <!--password-->
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Введите пароль"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            id="password"
            v-model="password"
            name="password"
          ></v-text-field>

          <!--подтвердить password-->
          <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Повторите пароль"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            id="confirmPassword"
            v-model="confirmPassword"
            name="confirmPassword"
          ></v-text-field>
          <!-- !кнопка  регистрации submit-->
          <v-btn
            block
            class="mb-2"
            color="blue"
            size="large"
            variant="tonal"
            type="submit"
          >
            Регистрация
          </v-btn>
          <v-card-subtitle v-if="errorMsg">{{ errorMsg }}</v-card-subtitle>
        </form>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="dialogReg = false"> Закрыть </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const dialog = ref(false); //для диалога входа
const dialogReg = ref(false); //для диалога регистрации

const visible = ref(false); // показывать пароль в инпуте

// создаем конст юзера
const user = useSupabaseUser();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");

const { auth } = useSupabaseClient();

// Регистрация
const userRegister = async () => {
  // проверяем пароль
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "Пароли не совпадают!";
    password.value = "";
    confirmPassword.value = "";
    setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
    return;
  }
  // если пароль норм, то ждем событие сигнап
  try {
    const { error } = await auth.signUp({
      email: email.value,
      password: password.value,
      // options: {
      //   data: {
      //     status: "s_admin",
      //     age: 27,
      //   },
      // },
    });
    email.value = "";
    password.value = "";
    confirmPassword.value = "";

    if (error) throw error;
    dialog.value = false; //закрываем окно, если логин успешный
    dialogReg.value = false; //закрываем окно, если логин успешный
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
  }
};
//const te = () => {console.log('user.value=', user.value);}

//*функция юзерлогин ожидает от auth метод входа по паролю с папраметрами мейл и пасс
const userLogin = async () => {
  try {
    const { error } = await auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    //очищает поля
    email.value = "";
    password.value = "";

    // выдает сообщение об ошибке, если есть
    if (error) throw error;
    //console.log("прошел иф");
    dialog.value = false; //закрываем окно, если логин успешный
  } catch (error) {
    errorMsg.value = error.message;

    setTimeout(() => {
      errorMsg.value = "";
    }, 3000);
  }
};

//!ожидание выхода
const userLogout = async () => {
  await auth.signOut();
};

//если юзер вошел, то на главную
// watchEffect(() => {
//   if (!user.value) {
//     return navigateTo("/");
//   }
// });

//Меню юзера. Или делать все тут, или все в темплате
const items_menu = [
  {
    title: "Vuetify 2",
    href: "https://v2.vuetifyjs.com/en/components/application/#default-application-markup",
    icon: "$vuetify",
  },
  {
    title: "Vuetify 3",
    href: "https://vuetifyjs.com/en/features/icon-fonts/#mdi-icon-search",
    icon: "$vuetify",
  },
];
</script>

<style scoped></style>
