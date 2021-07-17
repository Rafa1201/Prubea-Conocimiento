document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            id: '',
            account_name: '',
            username: '',
            password: '',
            site_url: '',
            logo_url: '',
            created_at: '',
            tickets: [],
            ticket:{},
        },
        methods: {
            ramdonpass: function () {
                this.password = Math.round(Math.random() * 999999);
            },
            guardar: function () {
                this.ticket = {
                    account_name: this.account_name,
                    username: this.username,
                    password: this.password,
                    site_url: this.site_url,
                    logo_url: this.logo_url,
                    created_at: this.created_at
                };
                
                this.account_name = '';
                this.username = '';
                this.password = '';
                this.site_url = '';
                this.logo_url = '';
                this.created_at = '';

                console.log("-----> "+this.id);

                if(this.id != null){ //Actualizar
                    this.ticket.id=this.id;
                    axios.put("http://localhost:3000/passwords/" + this.id, this.ticket).then(result => {
                        console.log(result);
                        this.listar();
                    });
                }else{ //crear nuevo
                    axios.post("http://localhost:3000/passwords", this.ticket).then((result) => {
                        console.log(result);
                        this.listar();
                    });
                }
                
            },
            listar: function () {
                this.tickets=[];
                axios.get("http://localhost:3000/passwords").then((result) => {
                    result.data.forEach(x => {
                        this.tickets.push(x); 
                    });
                });
            },
            borrar: function (id) {
                axios.delete("http://localhost:3000/passwords/" + id).then(result => {
                    this.tickets=[];
                    console.log(result);
                    this.listar();
                });
            },
            editar: function (id) {
                axios.get("http://localhost:3000/passwords/" + id).then(result => {
                    this.id = result.data.id;
                    this.account_name = result.data.account_name;
                    this.username = result.data.username;
                    this.password = result.data.password;
                    this.site_url = result.data.site_url;
                    this.logo_url = result.data.logo_url;
                    this.created_at = result.data.created_at;
                });
            }
        },
        beforeMount(){
            this.listar();
        }
    });
});