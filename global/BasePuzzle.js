Vue.component("base-puzzle", {
    props: {
        title: String
    },
    methods: {
        hasSlot(name = "default") {
            return !!this.$slots[name] || !!this.$scopedSlots[name];
        }
    },
    mounted() {
        document.title = this.title;
    },
    template: `
    <div class="COMPONENT base-puzzle">
        <div class="title">{{title}}</div>
        <div v-if="hasSlot('header')">
            <slot name="header"/>
        </div>
        <div v-if="hasSlot('flavour-text')" class="flavour-text">
            <slot name="flavour-text"/>
        </div>
        <slot></slot>
    </div>`
})
