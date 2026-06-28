from django.urls import path
from . import views

urlpatterns = [
    path('blogs/', views.BlogListCreateView.as_view()),
    path('blogs/<int:pk>/', views.BlogDetailView.as_view()),
    path('my-blogs/', views.MyBlogsView.as_view()),
    path('comments/',views.CommentCreateView.as_view()),
    path('blogs/<int:blog_id>/comments/',views.CommentListView.as_view()),
    path('blogs/<int:blog_id>/like/',views.ToggleLikeView.as_view()),
    path('blogs/<int:blog_id>/bookmark/', views.ToggleBookmarkView.as_view()),
    path('my-bookmarks/', views.MyBookmarksView.as_view()),
]