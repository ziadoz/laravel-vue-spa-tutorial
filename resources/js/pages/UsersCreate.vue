<template>
    <div>
        <h1>Create User</h1>
        <div v-if="message" class="alert">{{ message }}</div>
        <form @submit.prevent="onSubmit($event)">
            <div class="form-group">
                <label for="user-name">Name</label>
                <input id="user-name" type="text" v-model="user.name" />
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>

            <div class="form-group">
                <label for="user-email">Email</label>
                <input id="user-email" type="text" v-model="user.email" />
                <p v-if="errors.email" class="error">{{ errors.email }}</p>
            </div>

            <div class="form-group">
                <label for="user-password">Password</label>
                <input id="user-password" type="password" v-model="user.password" />
                <p v-if="errors.email" class="error">{{ errors.password }}</p>
            </div>

            <div class="form-group">
                <button type="submit" :disabled="saving">
                    {{ saving ? 'Creating...' : 'Create' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import users from '~/api/users';
import flash from '~/mixins/flash';
import parseValidationErrors from '~/util/parseValidationErrors';

export default {
    mixins: [flash],
    data() {
        return {
            saving: false,
            user: {
                name: '',
                email: '',
                password: '',
            },
            errors: {
                name: "",
                email: "",
                password: "",
            }
        };
    },
    methods: {
        onSubmit($event) {
            this.saving = true;
            this.message = false;

            users.create(this.user)
                .then((response) => {
                    this.user = response.data.data;
                    this.clearErrors();
                    this.flashMessage('User created', () => {
                        this.$router.push({ name: 'users.edit', params: { id: response.data.data.id } });
                    }, 0);
                }).catch((error) => {
                    if (error.response.status === 422) {
                        const errors = parseValidationErrors(error);
                        this.errors.name = errors.name;
                        this.errors.email = errors.email;
                        this.errors.password = errors.password;
                        this.flashMessage('User validation failed');
                    }
                })
                .then(() => {
                    this.saving = false;
                })
        },
        clearErrors() {
            this.errors = {
                name: "",
                email: "",
                password: "",
            };
        }
    }
};
</script>

<style lang="scss" scoped>
$red: lighten(red, 30%);
$darkRed: darken($red, 50%);

.form-group {
    margin-bottom: 1em;
    label {
        display: block;
    }
}
.alert {
    background: $red;
    color: $darkRed;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 50%;
    border: 1px solid $darkRed;
    border-radius: 5px;
}

.error {
    color: $darkRed;
    margin: 10px 0;
    padding: 0;
}
</style>
