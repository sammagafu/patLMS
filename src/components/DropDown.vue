<template>
<slot name="body"></slot>
</template>
<script>
export default{
    name:"DropDown",
    props:{
         title:String,
         isOpen:Boolean
    }
}
</script>