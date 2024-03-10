const PROTO_PATH = "./comments.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true,
});

const commentsService = grpc.loadPackageDefinition(packageDefinition).CommentService;

const client = new commentsService("127.0.0.1:3001", grpc.credentials.createInsecure());

module.exports = client;
