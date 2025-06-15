export class DataBaseManager {
	#baseURL;
	constructor(baseURL) {
		this.#baseURL = baseURL;
	}

	async verifyResponse(response) {
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`ERRO! ${errorText}`);
		}
	}

	async getAllData(endpoint) {
		try {
			console.log(`Fetching: ${this.#baseURL}/${endpoint}`);
			const response = await fetch(`${this.#baseURL}/${endpoint}`);

			console.log(`Status da resposta: ${response.status}`);
			await this.verifyResponse(response);

			return response.json();
		} catch (error) {
			console.error("Erro ao buscar dados:", error.message);
			throw error;
		}
	}

	async getDataById(endpoint, id) {
		const response = await fetch(`${this.#baseURL}/${endpoint}/${id}`);

		await this.verifyResponse(response);

		return response.json();
	}

	async createItem(endpoint, data) {
		const response = await fetch(`${this.#baseURL}/${endpoint}`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(data),
		});

		await this.verifyResponse(response);

		return response.json();
	}

	async deleteItem(endpoint, id) {
		console.log(`${this.#baseURL}/${endpoint}/${id}`);
		const response = await fetch(`${this.#baseURL}/${endpoint}/${id}`, {
			method: "DELETE",
		});

		await this.verifyResponse(response);

		return true;
	}

	async updateItem(endpoint, id, data) {
		try {
			const response = await fetch(`${this.#baseURL}/${endpoint}/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			await this.verifyResponse(response);

			return await response.json();
		} catch (error) {
			throw new Error(`Erro ao atualizar item: ${error.message}`);
		}
	}
}
