<template>

    <div v-if="openmodal">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Document preview</h4>
                                <div class="close" @click="closeModal">
                                    <span aria-hidden="true">&times;</span>
                                </div>
                            </div>
                            <div class="modal-body">
                                <div class="form-group row">
                                    <div class="col-sm-10 offset-md-1">
                                        <embed v-if="!loading" :src="attachment" width="100%" height="600" type='application/pdf'>
                                        <div  v-if="loading" :class="{'loader':loading}" width="100%" height="600"></div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
	export default {
		props: {
			openmodal:{},
			attachment:{},
			loading:{
				default: false
            },
        },
		data() {
			return {
				file: null,
			}
		},
		methods: {
			closeModal() {
				this.$parent.$emit('closePreviewModal');
			},
			handleFileUpload(){
				this.file = this.$refs.file.files[0];
			},
			submitFile(){
				this.$parent.$emit('uploadNewDocument', this.file)
			}
		},
	}
</script>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-header {
        background-color: lightblue;
    }
</style>