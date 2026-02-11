import fs from "fs/promises"

class ProductsManager {

    async existFile(){
        fs.readFile("products.json", {encoding: "utf-8"})
        .then((data) => console.log(data))
        .catch( async(error) => {
           if(error){
            await fs.writeFile("products.json", JSON.stringify([]),
            {encoding:"utf-8"})
           }
        })
    }


    async createProduct (product){
    const file = await this.existFile()
    if(file){
        const products = await fs.readFile("products.json", {encoding:"utf-8"})
        console.log(product)
    }
    }
   
    async getProducts (){
        const file = await this.existFile()
        if(file){
            const products = await fs.readFile("products.json", {encoding: "utf-8"})
            console.log(products)
        }
    }

}
/* new ProductsManager().existFile().then() */
 new ProductsManager()/* .createProduct() */
 .getProducts.then()

