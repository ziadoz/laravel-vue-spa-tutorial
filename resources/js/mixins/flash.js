export default {
    data() {
        return {
            message: "",
        }
    },
    methods: {
        flashMessage(message, fn = () => {}, timeout = 5000) {
            this.message = message;
            setTimeout(() => {
                this.message = null;
                fn();
            }, timeout);
        }
    }
};
