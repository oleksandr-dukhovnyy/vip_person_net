<template>
	<div class="actions--contain">
		<div class="actions">
			<div class="actions__table--contain">
				<div class="actions__table"
					:class="{
						'closed-editor': editorOn
					}"
				>
					<div title="Порядковый номер экшена. Чем больше - тем старше. Экшн №1, например, произошел ПОСЛЕ экшена №2">#</div>
					<div title="Название экшена (действия)">Экшн</div>
					<div title="НОВОЕ значение заработка клиента в %">Значение</div>
					<div title="Дата события">Дата</div>
					<div title="Панель с кнопками управления событиями. Наведите на иконки действий, чтобы увидеть подсказку">Управление</div>
				</div>
				<div
					v-for="(action, i) in actions"
					:key="i"
					class="actions__table"
					:class="{
						'closed-editor': editorOn,
						selected: i === currentActionID
					}"
				>
					<div title="Порядковый номер экшена. Чем больше - тем старше. Экшн №1, например, произошел ПОСЛЕ экшена №2">
						{{ i + 1 }}
					</div>
					<div>{{ actionNames[action.name] | text }}</div>
					<div>{{ action.value | number2 }}</div>
					<div>{{ action.date | timeFromISO8601 }}</div>
					<div class="actions__table--item">
						<img
							src="@/assets/icons/edit.svg"
							alt="edit"
							title="Редактировать экшн"
							@click="setActionToEditor(i)"
						>
						<img
							src="@/assets/icons/copy.png"
							alt="copy"
							title="Дублировать экшн. Копия появится вверху списка."
							@click="copyAction(i)"
						>
						<img
							src="@/assets/icons/move.png"
							alt="move"
							title="Переместить экшн. В выпадающем окне укажите новый индекс экшена. Экшн, который сейчас на заданном индексе, сдвинется вниз"
							@click="moveAction(i)"
						>
						<button
							type="button"
							class="btn-close"
							aria-label="close"
							title="Удалить экшн навсегда. После сохранения изменений это действие нельзя будет отменить!"
							@click="deleteAction(i)"
						></button>
					</div>
				</div>
			</div>
			<div
				class="actions__action-editor"
				v-if="editorOn"
			>
				<div class="actions__action-editor--close-contain">
					<button
						type="button"
						class="btn-close actions__action-editor--close"
						aria-label="close"
						@click="closeEditor"
					></button>
				</div>
				<div class="actions__action-editor--inpus">
					<select v-model="editorName">
						<option value="" selected disabled>Действие</option>
						<option value="put">
							Пополнение
						</option>
						<option value="withdrawal">
							Снятие
						</option>
						<option value="round-end">
							Окночание торгового раунда
						</option>
						<option value="open">
							Открытие счёта
						</option>
					</select>
					<input
						type="text"
						placeholder="Значение"
						title='Новый процент клиента. Можно со знаком "%", можно без.'
						v-model="editorValue"
					>
					<eui-date
						v-model="editorDate"
						type="datetime"
						placeholder="Select date and time"
						default-time="00:00:00"
						size="small"
						name="date"
					>
					</eui-date>
				</div>
				
				<div class="actions__action-editor--buttons">
					<button
						type="button"
						class="btn btn-success"
						:disabled="!edited"

						@click="editorSave"
					>
						Сохранить
					</button>
					<button
						type="button"
						class="btn btn-dark"

						@click="closeEditor"
					>
						Закрыть
					</button>
				</div>
			</div>
		</div>
		<div class="actions__new-action" v-if="!SAVE_USER_DATA_LOADING">
			<button
				type="button"
				class="btn btn-success"
				@click="newAction"
				title="Создать новый экшн. Он появится на позиции 1"
			>
				Новый экшн
			</button>
		</div>
		<div class="dropdown-divider dropdown-divider--top"></div>
		<!-- <div v-if="!SAVE_USER_DATA_LOADING">
			<ClientTable
				:client="client"
			/>
		</div>
		<div class="dropdown-divider dropdown-divider--top"></div> -->
		<div class="actions__save-changes" v-if="!SAVE_USER_DATA_LOADING">
			<!-- <Pagination
				:perPage="10"
				:page="0"
				:items="32"

				@pageSelected="pageSelected"
			/> -->
			<button
				type="button"
				class="btn btn-success"
				:disabled="!clientDataChanged"
				@click="saveChanges"
				title="Отправить изменения на сервер. Это действие нельзя отменить!"
			>
				Сохранить изменения
			</button>
			<button
				type="button"
				class="btn btn-dark"
				:disabled="!clientDataChanged"
				@click="resetChanges"
				title="Сбросить не сохраненные изменения."
			>
				Отменить изменения
			</button>
		</div>
		<Loader v-else />
	</div>
</template>

<script>
// import Pagination from '@/components/Pagination/Pagination.vue';
import ClientTable from '../ClientTable.vue';
import move from '@/utils/moveItemInArray.js';
import { mapActions, mapGetters } from 'vuex';
const vuexActions = ['SAVE_USER_DATA'];
const vuexGetters = ['SAVE_USER_DATA_LOADING']

function editedTrue () { this.edited = true; }

export default {
	name: 'Actions',
	components: { ClientTable },
	props: {
		client: {
			type: Object
		}
	},
	// components: { Pagination },
	data(){
		return {
			editorOn: false,
			editorName: '',
			editorDate: '',
			editorValue: '',
			edited: false,
			// selectedPage: 1,
			actionNames: {
				put: 'Пополнение',
				withdrawal: 'Снятие',
				'round-end': 'Окночание торгового раунда',
				open: 'Открытие счёта'
			},
			currentActionID: -1,
		}
	},
	watch: {
		editorName: editedTrue,
		editorDate: editedTrue,
		editorValue: editedTrue,
		currentActionID(n){
			const action = this.actions[n] || {
				name: '',
				value: '',
				date: '',
			};

			this.editorName = action.name;
			this.editorDate = action.date;
			this.editorValue = action.value;

			this.$nextTick()
				.then(() => this.edited = false);
		}
	},
	methods: {
		...mapActions(vuexActions),
		closeEditor(){
			this.editorOn = false;
			this.currentActionID = -1;
		},
		setActionToEditor(id){
			this.currentActionID = id;
			this.editorOn = true;
			this.edited = false;
		},
		editorSave(){
			const newAction = {
				date: new Date(this.editorDate).toISOString(),
				value: this.editorValue,
				name: this.editorName
			}
			
			this.client.actions
				.splice(this.currentActionID, 1, newAction);
			
			this.edited = false;
		},
		moveAction(index){
			const newPosition = +prompt('На какую позицию переместить?') - 1;

			if (!isNaN(newPosition) && newPosition !== null && newPosition !== undefined) {
				move(this.client.actions, +index, newPosition);
				this.currentActionID = newPosition;
			}
		},
		copyAction(index){
			const action = JSON.parse(
				JSON.stringify(
					this.actions[index]
				)
			);

			this.insertAction(action);
			this.setActionToEditor(0);
		},
		insertAction(action){
			this.client.actions.unshift(action);
		},
		deleteAction(index){
			if (this.currentActionID >= index) {
				if (this.currentActionID === index) {
					this.currentActionID = -1;
					this.editorOn = false;
				} else {
					this.currentActionID--;
				}
			}
			this.client.actions.splice(index, 1);
		},
		resetChanges(){
			this.client.actions = JSON.parse(JSON.stringify(this.client.oldData)).actions;
		},
		saveChanges(){
			this.SAVE_USER_DATA(
				JSON.parse(JSON.stringify(this.client))
			);
			this.client.oldData = JSON.parse(JSON.stringify({
				...this.client.oldData,
				actions: this.client.actions
			}));
		},
		newAction(){
			this.insertAction({
				date: new Date().toISOString(),
				value: '',
				name: ''
			});
			this.setActionToEditor(0);
		}
	},
	computed: {
		...mapGetters(vuexGetters),
		actions(){
			return this.client.actions;
		},
		clientDataChanged(){
			const client = JSON.parse(JSON.stringify(this.client));
			const oldData = client.oldData.actions;
			delete client.oldData;

			return JSON.stringify(client.actions) !== JSON.stringify(oldData);
		}
	}
}

</script>

<style scoped lang="scss">
	// sizes (cs - ceil size)
	$id-cs: 16px;
	$name-cs: 1fr;
	$value-cs: 80px;
	$date-cs: 150px;
	$controlls-cs: 100px;

	.dropdown-divider {
		&--top {
			margin-top: padding(5);
		}
	}

	.actions {
		padding: padding() 0;
		display: flex;

		&.closed-editor {
			display: block;
		}

		&__new-action {
			text-align: right;

			display: grid;
			grid-template-columns: max-content max-content max-content;
			grid-gap: padding();
			justify-items: center;

			.pagination--contain {
				align-items: center;
				display: flex;
				margin: none;
			}
		}

		&__save-changes {
			display: grid;
			grid-template-columns: max-content max-content;
			grid-gap: padding();
			justify-content: flex-end;
		}

		&__table {
			width: 100%;
			display: grid;
			grid-gap: padding();
			grid-template-columns: $id-cs $name-cs $value-cs $date-cs $controlls-cs;
			border-bottom: 1px solid $gray;
			padding: padding();

			&.selected {
				background-color: aliceblue;
			}

			&--item {
				display: grid;
				grid-template-columns: repeat(4, 20px);
				grid-gap: 5px;

				img {
					width: 20px;
					opacity: 0.9;
					cursor: pointer;

					@include scaleble(1.2);

					&:hover {
						opacity: 1;
					}
				}
			}

			&--contain {
				width: 100%;
			}
		}

		&__action-editor {
			margin-left: padding();

			padding: padding();

			width: 100%;
			min-height: 250px;
			max-height: 400px;
			max-width: 255px;
			border: 1px solid rgb(194, 194, 194);
    		border-radius: $border-radius;

			display: grid;
			grid-template-rows: 14px (40px + 32px + 32px) 1fr;
			grid-gap: padding();

			&--close-contain {
				text-align: right;
			}

			&--buttons {
				display: flex;
				justify-content: space-evenly;
				align-items: flex-end;
			}

			&--inpus {
				margin: padding();
				input {
					@include input;
					padding: padding();
					margin-bottom: padding();
				}

				select {
					width: 100%;
					border: 1px solid rgb(194, 194, 194);
    				border-radius: $border-radius;
					padding: padding();
					margin-bottom: padding();
					font-size: $font-size-small;
				}
			}
		}
	}
</style>