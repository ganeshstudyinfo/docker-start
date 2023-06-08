import graphene
from graphene_django.types import DjangoObjectType
from graphql_relay.node.node import from_global_id

from . import models
import json
from django.contrib.auth.models import User

from graphene_django.filter import DjangoFilterConnectionField
from django_filters import FilterSet


class UserType(DjangoObjectType):
    class Meta:
        model = User

class MessageFilter(FilterSet):
    class Meta:
        model = models.Message
        fields={
            'message':['icontains'],
            'user__email':['icontains']
        }
class MessageType(DjangoObjectType):
    class Meta:
        model =  models.Message
        interfaces = (graphene.Node, )
        fields = "__all__"
        filterset_class = MessageFilter
        # use_connection = True

class Query(graphene.ObjectType):
    # all_messages = graphene.List(MessageType)
    all_messages = DjangoFilterConnectionField(MessageType)
    
    message = graphene.Field(MessageType, id=graphene.ID())

    current_user = graphene.Field(UserType)

    @staticmethod
    def resolve_current_user(root,info,*args,**kwargs):
        if not info.context.user.is_authenticated:
            return None
        return info.context.user

    @staticmethod
    def resolve_message(root,info,*args,**kwargs):
        rid = from_global_id(kwargs.get('id'))
        return models.Message.objects.get(pk=rid[1])

    @staticmethod
    def resolve_all_messages(root, info,*args,**kwargs):
        return models.Message.objects.all()

class CreateMessageMutation(graphene.Mutation):
    class Input:
        message = graphene.String()
    
    status = graphene.Int()
    formErrors = graphene.String()
    message = graphene.Field(MessageType)
    
    @staticmethod
    def mutate(root,info,*args,**kwargs):
        if not info.context.user.is_authenticated:
            return CreateMessageMutation(status=403)
        message = kwargs.get("message","").strip()
        # Here we would usually use Django forms to validate the input
        if not message:
            return CreateMessageMutation(
                status = 400,
                formErrors=json.dumps(
                    {'message': ['Please enter a message.']}
                )
            )
        obj = models.Message.objects.create(
            user=info.context.user, message=message
        )
        print(obj)
        return CreateMessageMutation(status=200, message=obj)


class Mutation(graphene.ObjectType):
    create_message = CreateMessageMutation.Field()