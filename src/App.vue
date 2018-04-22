<template>
    <div id="app">
        <div class="btn btn-info" @click="openDocumentInput">Add new document</div>

        <app-input-modal :openmodal="showInputModal"></app-input-modal>
        <app-preview-modal :attachment="attachment" :loading="attachmentLoading"
                           :openmodal="showPreviewModal"></app-preview-modal>


        <div class="container">
            <div class="row row1">
                <div v-if="loading" :class="{'loader':loading}" width="100%" height="600"></div>
                <div v-for="document in documents" class="col-md-3">
                    <div class="card">
                        <!--<div class="" v-for="document in documents">-->
                        <div class="card-body" @click="openDocumentPreview(document.id, document.attachmentId)">
                            <img :src="getThumbSource(document)">
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <nav v-if="pages>1">
            <ul class="pagination justify-content-center">
                <li v-if="selectedPage!==1" class="page-item" @click="getPreviousPage">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>

                <li class="page-item" v-for="page in pages" @click="getDataByPage(page)"
                    :class="{'active': page===selectedPage}">
                    <div class="page-link" href="#">{{page}}</div>
                </li>

                <li v-if="selectedPage!==pages" class="page-item" @click="getNextPage">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>

	import axios from 'axios'

	const axiosInstance = axios.create({
		// baseURL: 'http://rail-test-api.localhost/api/v1/',
		baseURL: 'http://api.12a.lv/api/v1/',
		timeout: 10000,
	});

	export default {
		name: 'app',
		data() {
			return {
				documents: [],
				showInputModal: false,
				showPreviewModal: false,
				attachment: null,
				newDocument: null,
				attachmentLoading: false,
				loading: false,
				pages: 0,
				selectedPage: 1
			}
		},
		methods: {
			getData() {
				this.documents = []
				this.loading = true;
				axiosInstance.get('/documents', {
					params: {page: this.selectedPage}
				})
					.then((response) => {
						this.documents = response.data.documents
						this.pages = response.data.pages
						this.loading = false
					})
					.catch(function (error) {
						console.log(error)
						this.loading = false
					});
			},
			getDataByPage(page) {
				this.selectedPage = page
				this.getData()
			},
			getNextPage() {
				this.selectedPage++
				this.getData()
			},
			getPreviousPage() {
				this.selectedPage--
				this.getData()
			},
			getDocument(documentId, attachmentId) {
				this.attachmentLoading = true
				axiosInstance.get('/documents/' + documentId + '/attachment/previews/' + attachmentId, {
					params: {}
				})
					.then((response) => {
						this.attachment = response.data.file
						this.attachmentLoading = false
					})
					.catch(function (error) {
						console.log(error);
						this.attachmentLoading = false
					});
			},
			uploadNewDocument() {
				this.loading = true;
				let formData = new FormData();

				formData.append('file', this.newDocument);

				axiosInstance.post('/documents', formData,
				)
					.then((response) => {
						this.getData()
						this.loading = false;
					})
					.catch(function (error) {
						console.log(error);
						this.loading = false;
					});
			},
			openDocumentInput() {
				this.showInputModal = true
			},
			closeDocumentInput() {
				this.showInputModal = false
			},
			openDocumentPreview(documentId, attachmentId) {
				this.attachment = null
				this.getDocument(documentId, attachmentId)
				this.showPreviewModal = true
			},
			closeDocumentPreview() {
				this.showPreviewModal = false
			},

			getThumbSource(document) {
				return document.thumb;
			},
		}, created() {
			this.getData()

			this.$on('closeInputModal', function () {
				this.closeDocumentInput();
			})
			this.$on('uploadNewDocument', function (document) {
				this.newDocument = document
				this.closeDocumentInput()
				this.uploadNewDocument()
			})
			this.$on('closePreviewModal', function () {
				this.closeDocumentPreview();
			})
		}
	}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    a {
        color: #42b983;
    }

    .row1 > div {
        margin-top: 1em;
    }

    .card-body > img {
        max-height: 100%;
        max-width: 100%;
    }

    .card-body {
        cursor: pointer;
    }

    .pagination {
        margin-top: 10px;
    }

    .loader {
        border: 6px solid #f3f3f3;
        border-radius: 50%;
        border-top: 6px solid #3498db;
        width: 40px;
        height: 40px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
        left: 50%;
        top: 50%;
        position: fixed;
        z-index: 99999;
    }

    /* Safari */
    @-webkit-keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
