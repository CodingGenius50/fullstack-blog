from rest_framework import serializers
from .models import Blog, Comment, Like, Bookmark


class BlogSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()

    # ✅ SAFE IMAGE HANDLING (IMPORTANT FIX)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = '__all__'

    def get_image(self, obj):
        """
        Prevents 500 error if image is missing/corrupt
        """
        try:
            if obj.image:
                return obj.image.url
        except Exception:
            return None
        return None

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_is_bookmarked(self, obj):
        request = self.context.get('request')

        if not request or request.user.is_anonymous:
            return False

        return obj.bookmarks.filter(user=request.user).exists()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['user']


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'
        read_only_fields = ['user']


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
        read_only_fields = ['user']