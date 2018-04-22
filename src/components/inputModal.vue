<template>

    <div v-if="openmodal">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Add new document (pdf)</h4>
                                <div class="close" @click="closeModal">
                                    <span aria-hidden="true">&times;</span>
                                </div>
                            </div>
                            <div class="modal-body">
                                <div class="form-group row">
                                    <!--<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Email</label>-->
                                    <div class="col-sm-10 offset-md-1">


                                        <div class="file-name" v-if="getFileName">{{getFileName}}</div>
                                        <div class="custom-file">

                                            <input type="file" class="custom-file-input" id="customFile" ref="file"
                                                   @change="handleFileUpload()">
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row text-center">
                                    <div class="col-md-12" v-if="file">
                                        <div v-if="isFilePdf === true" class="btn btn-info" @click="submitFile()">Upload</div>
                                        <div v-if="isFilePdf !== true && isFilePdf" class="wrong-file-type">{{isFilePdf}}</div>
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
		props: [
			'openmodal'
		],
		data() {
			return {
				file: null
			}
		},
		methods: {
			closeModal() {
				this.$parent.$emit('closeInputModal');
			},
			handleFileUpload() {
				this.file = this.$refs.file.files[0];
			},
			submitFile() {
				this.$parent.$emit('uploadNewDocument', this.file)
				this.file = null
			}
		},
		computed: {
			getFileName() {
				if (this.file) {
					return this.file.name
				}
				return null;
			},
            isFilePdf(){
				if(this.file && this.file.type == 'application/pdf'){
                    return true;
                }
                return 'File should be pdf type!';
            }

		},
		watch: {}
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
    .file-name{
        margin: 5px 0px;
    }
    .wrong-file-type{
        color: red;
    }
</style>