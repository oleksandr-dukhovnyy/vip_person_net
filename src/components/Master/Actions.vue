<template>
	<div class="actions--contain">
		<div class="actions">
			<div class="actions__table--contain">
				<div class="actions__table"
					:class="{
						'closed-editor': editorOn
					}"
				>
					<div>#</div>
					<div>Экшн</div>
					<div>Значение</div>
					<div>Дата</div>
					<div>Управление</div>
				</div>
				<div
					v-for="(action, i) in actions"
					:key="i"
					class="actions__table"
					:class="{
						'closed-editor': editorOn
					}"
				>
					<div>{{ i + 1 }}</div>
					<div>{{ action.name }}</div>
					<div>{{ action.value }}</div>
					<div>{{ action.date }}</div>
					<div class="actions__table--item">
						<img
							src="@/assets/icons/edit.svg"
							alt="copy"
							title="Редактировать экшн"
							@click="setActionToEditor(i)"
						>
						<img
							src="@/assets/icons/copy.png"
							alt="copy"
							title="Дублировать экшн. Копия появится вверху списка."
						>
						<img
							src="@/assets/icons/move.png"
							alt="copy"
							title="Переместить экшн."
						>
						<button
							type="button"
							class="btn-close"
							aria-label="close"
							title="Удалить экшн. Это действие нельзя отменить!"
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
						:disabled="!edited"

						@click="closeEditor"
					>
						Закрыть
					</button>
				</div>
			</div>
		</div>
		<div class="actions__new-action">
			<button
				type="button"
				class="btn btn-success"
			>
				Новый экшн
			</button>
		</div>
	</div>
</template>

<script>
/*
actionControlls:
	Редактировать экшн
	Дублировать экшн
	Переместить экшн
	Удалить экшн
*/

function editedTrue () {
	this.edited = true;
}

export default {
	name: 'Actions',
	data(){
		return {
			editorOn: false,
			editorName: '',
			editorDate: '',
			editorValue: '',
			edited: false,
			actionNames: [
				'Пополнение',
				'Снятие',
				'Окночание торгового раунда',
				'Открытие счёта'
			],
			actions: [
				{ name: 'Окночание торгового раунда', value: 1032, date: '15.07.2022, 15:33' },
				{ name: 'put', value: 1032, date: '15.07.2022, 15:33' },
				{ name: 'put', value: 1032, date: '15.07.2022, 15:33' },
				{ name: 'put', value: 1032, date: '15.07.2022, 15:33' },
				{ name: 'put', value: 1032, date: '15.07.2022, 15:33' },
				{ name: 'put', value: 1032, date: '15.07.2022, 15:33' },
				{ name: 'put', value: 1032, date: '15.07.2022, 15:33' }
			],
			currentActionID: -1
		}
	},
	watch: {
		editorName: editedTrue,
		editorDate: editedTrue,
		editorValue: editedTrue,
	},
	methods: {
		closeEditor(){
			this.editorOn = false;
		},
		setActionToEditor(id){
			this.currentActionID = id;
			this.editorOn = true;
		},
		editorSave(){
			const newAction = {
				date: new Date(this.editorDate).toISOString(),
				value: this.editorValue,
				name: this.editorName
			}

			console.log('newAction', newAction);
		}
	},
	currentAction(){
		const action = this.actions[this.currentActionID] || {
			name: '',
			value: '',
			date: '',
		};

		this.editorName = action.name;
		this.editorDate = action.date;
		this.editorValue = action.value;

		this.edited = false;
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

	.actions {
		padding: padding() 0;
		display: flex;

		&.closed-editor {
			display: block;
		}

		&__new-action {
			text-align: right;
		}

		&__table {
			width: 100%;
			display: grid;
			grid-gap: padding();
			grid-template-columns: $id-cs $name-cs $value-cs $date-cs $controlls-cs;
			border-bottom: 1px solid $gray;
			padding: padding();

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
			// height: max-content;
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