<template>
    <div>
        <h1>Edit User</h1>
        <div v-if="message" class="alert">{{ message }}</div>
        <div v-if="! loaded">Loading...</div>
        <form @submit.prevent="onSubmit($event)" v-else>
            <div class="form-group">
                <label for="user-name">Name</label>
                <input id="user-name" type="text" v-model="user.name" />
                <p v-if="errors.name" class="error">{{ errors.name }}</p>
            </div>

            <div class="form-group">
                <label for="user-email">Email</label>
                <input id="user-email" type="email" v-model="user.email" />
                <p v-if="errors.email" class="error">{{ errors.email }}</p>
            </div>

            <div class="form-group">
                <button type="submit" :disabled="saving">
                    {{ saving ? 'Updating...' : 'Update' }}
                </button>
                <button type="submit" :disabled="saving" @click.prevent="onDelete($event)">Delete</button>
            </div>
        </form>
    </div>
</template>

<script>
import users from '~/api/users.js';

export default {
    data() {
        return {
            loaded: false,
            saving: false,
            message: null,
            user: {
                id: null,
                name: "",
                email: "",
            },
            errors: {
                name: "",
                email: "",
            }
        };
    },
    methods: {
        onSubmit(event) {
            this.saving = true;
            users.update(this.user.id, {
                name: this.user.name,
                email: this.user.email,
            }).then((response) => {
                this.flashMessage('User updated');
                this.clearErrors();
                this.user = response.data.data;
            }).catch((error) => {
                if (error.response.status === 422) {
                    const { name: nameErrors, email: emailErrors } = error.response.data.errors;
                    this.errors.name = (nameErrors && nameErrors[0] ? nameErrors[0] : "");
                    this.errors.email = (emailErrors && emailErrors[0] ? emailErrors[0] : "");
                    this.flashMessage('User validation failed');
                }
            }).then(() => {
                this.saving = false;
            });
        },
        onDelete(event) {
            this.saving = true;
            users.delete(this.user.id)
                .then((response) => {
                    this.flashMessage('User deleted', () => {
                        this.$router.push({ name: 'users.index' });
                    }, 2000);
                });
        },
        flashMessage(message, fn = () => {}, timeout = 5000) {
            this.message = message;
            setTimeout(() => {
                this.message = null;
                fn();
            }, timeout);
        },
        clearErrors() {
            this.errors = { name: "", email: "" };
        }
    },
    created() {
        users.find(this.$route.params.id).then(response => {
            this.loaded = true;
            this.user = response.data.data;
        }).catch((error) => {
            this.$router.push({ name: '404' });
        });
    }
};
</script>

<style lang="scss" scoped>
$red: lighten(red, 30%);
$darkRed: darken($red, 50%);

.form-group label {
    display: block;
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
