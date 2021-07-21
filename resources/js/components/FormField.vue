<template>
    <default-field
        :field="field"
        :errors="errors"
        :show-help-text="showHelpText"
    >
        <template slot="field">
            <input
                :id="field.name"
                type="text"
                class="w-full form-control form-input form-input-bordered"
                :class="errorClasses"
                :placeholder="field.name"
                v-model="value"
                ref="datePicker"
            />
        </template>
    </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from "laravel-nova";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: {
        resourceName: {},
        resourceId: {},
        field: {},
        value: {
            required: false
        },
        placeholder: {
            type: String,
            default: () => {
                return moment().format("HH:mm");
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        dateFormat: {
            type: String,
            default: "H:i"
        },
        altFormat: {
            type: String,
            default: "H:i "
        },
        twelveHourTime: {
            type: Boolean,
            default: false
        },
        enableTime: {
            type: Boolean,
            default: true
        },
        enableSeconds: {
            type: Boolean,
            default: true
        },
        firstDayOfWeek: {
            type: Number,
            default: 0
        }
    },

    data: () => ({ flatpickr: null }),

    watch: {
        value: function(newValue, oldValue) {
            if (this.flatpickr) {
                this.flatpickr.setDate(newValue);
            }
        }
    },

    mounted() {
        this.$nextTick(() => this.createFlatpickr());
    },

    methods: {
        /*
         * Set the initial, internal value for the field.
         */
        setInitialValue() {
            this.value = this.field.value || "";
        },

        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(this.field.attribute, this.value || "");
        },

        createFlatpickr() {
            this.flatpickr = flatpickr(this.$refs.datePicker, {
                noCalendar: true,
                enableTime: this.enableTime,
                enableSeconds: this.enableSeconds,
                onClose: this.onChange,
                onChange: this.onChange,
                dateFormat: this.dateFormat,
                altInput: true,
                altFormat: this.altFormat,
                allowInput: true,
                // static: true,
                time_24hr: !this.twelveHourTime,
                locale: { firstDayOfWeek: this.firstDayOfWeek }
            });
        },

        onChange(event) {
            this.$emit("change", this.$refs.datePicker.value);
        },

        clear() {
            this.flatpickr.clear();
        }
    },

    beforeDestroy() {
        this.flatpickr.destroy();
    }
};
</script>
