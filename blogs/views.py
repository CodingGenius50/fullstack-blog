from rest_framework import generics,filters
from rest_framework.permissions import IsAuthenticated
from .serializers import BlogSerializer
from .permissions import IsOwnerOrReadOnly
from .models import Comment
from .serializers import CommentSerializer

from .models import Bookmark
from .serializers import BookmarkSerializer
    
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Blog,Like
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


from rest_framework.permissions import IsAuthenticated, AllowAny

class BlogListCreateView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    parser_classes = [MultiPartParser, FormParser, JSONParser]

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'title']

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_serializer_context(self):
        return {"request": self.request}

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)




class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

class MyBlogsView(generics.ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user)
    
    
class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        blog_id = self.kwargs['blog_id']
        return Comment.objects.filter(blog_id=blog_id)
    


class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, blog_id):
        blog = Blog.objects.get(id=blog_id)

        like = Like.objects.filter(
            user=request.user,
            blog=blog
        ).first()

        if like:
            like.delete()
            return Response({"message": "Unliked"})

        Like.objects.create(
            user=request.user,
            blog=blog
        )

        return Response({"message": "Liked"})
    
from .models import Bookmark

class ToggleBookmarkView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, blog_id):

        blog = Blog.objects.get(id=blog_id)

        bookmark = Bookmark.objects.filter(
            user=request.user,
            blog=blog
        ).first()

        if bookmark:
            bookmark.delete()
            return Response({
                "message": "Bookmark Removed"
            })

        Bookmark.objects.create(
            user=request.user,
            blog=blog
        )

        return Response({
            "message": "Bookmarked"
        })
class MyBookmarksView(generics.ListAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(
            user=self.request.user
        )