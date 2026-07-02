from rest_framework import serializers
from .models import Blog, Comment, Like, Bookmark


class BlogSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = '__all__'

    def get_image(self, obj):
        try:
            if obj.image:
                return obj.image.url
        except:
            return None
        return None

    def get_likes_count(self, obj):
        try:
            return obj.likes.count()
        except:
            return 0

    def get_comments_count(self, obj):
        try:
            return obj.comments.count()
        except:
            return 0

    def get_is_bookmarked(self, obj):
        try:
            request = self.context.get('request', None)

            if not request or request.user.is_anonymous:
                return False

            return obj.bookmarks.filter(user=request.user).exists()

        except:
            return False
        
        
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ["user"]
        
class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = "__all__"
        read_only_fields = ["user"]
        
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"
        read_only_fields = ["user"]