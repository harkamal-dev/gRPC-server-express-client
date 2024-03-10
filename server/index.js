const PROTO_PATH = "./comments.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { uuid } = require("uuidv4");

const comments = [
	{
		id: 1,
		body: "This is some awesome thinking!",
		postId: 100,
		userid: 63,
	},
	{
		id: 2,
		body: "What terrific math skills you're showing!",
		postId: 27,
		userid: 71,
	},
];

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true,
});

const commentsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(commentsProto.CommentService.service, {
	getAll: (call, callback) => {
		callback(null, { comments });
	},
	get: (call, callback) => {
		let comment = comments.find((n) => n.id == call.request.id);
		console.log(comment);
		if (comment) {
			callback(null, comment);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Does not exist.",
			});
		}
	},
	create: (call, callback) => {
        let comment = call.request;
        comment.id = uuid();
		comments.push(comment);
		callback(null, comment);
	},
});

server.bindAsync("127.0.0.1:3001", grpc.ServerCredentials.createInsecure(), (err, port) => {
	if (err) {
		console.log("Error occured");
	} else {
		console.log("gRPC server is running at port " + port);
	}
});
