from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):

        # Anyone can read the blog
        if request.method in SAFE_METHODS:
            return True

        # Only the blog owner can edit or delete
        return obj.author == request.user