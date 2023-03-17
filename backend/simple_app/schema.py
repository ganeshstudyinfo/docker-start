import graphene
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import from_global_id

from . import models
import json

class MessageType(DjangoObjectType):
    class Meta:
        model =  models.Message
        interfaces = (graphene.Node, )

class Query(graphene.ObjectType):
    all_messages = graphene.List(MessageType)
    
    message = graphene.Field(MessageType, id=graphene.ID())

    def resolve_message(self, args, context, info):
        rid = from_global_id(args.get('id'))
        # rid is a tuple: ('MessageType', '1')
        return models.Message.objects.get(pk=rid[1])

    def resolve_all_messages(self, args, context, info):
        return models.Message.objects.all()

class CreateMessageMutation(graphene.Mutation):
    class Input:
        message = graphene.String()
    
    status = graphene.Int()
    formErrors = graphene.String()
    message = graphene.Field(MessageType)
    
    @staticmethod
    def mutate(root,args,context,info):
        if not context.user.is_authenticated:
            return CreateMessageMutation(status=403)
        message = args.get("message","").strip()
        # Here we would usually use Django forms to validate the input
        if not message:
            return CreateMessageMutation(
                status = 400,
                formErrors=json.dumps(
                    {'message': ['Please enter a message.']}
                )
            )
        obj = models.Message.objects.create(
            user=context.user, message=message
        )
        return CreateMessageMutation(status=200, message=obj)


class Mutation(graphene.ObjectType):
    create_message = CreateMessageMutation.Field()