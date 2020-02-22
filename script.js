// Code goes here
var app = angular.module('app', []);

app.factory('recognizeService', function ($http) {
    return {
        recognize: function (imgLink) {
            // Link tới RestAPI đã viết ở phần 
            var url = 'https://facerecognizeidols.azurewebsites.net/api/FaceRecognize';
            return $http({
                method: 'POST',
                url,
                data: {
                    "url": imgLink
                }
            });
        }
    }
});

app.controller('mainCtrl', function ($scope, recognizeService) {
    $scope.isLoading = false;

    $scope.$watch('imageLink', function (oldValue, newValue) {
        $scope.faces = [];
        $scope.faceDisplay = [];
    });

    // Gọi hàm này khi người dùng click button "Nhận diện"
    $scope.recognize = function () {
        if ($scope.isLoading)
            return;

        $scope.isLoading = true;
        // Gọi hàm recognize của service
        recognizeService.recognize($scope.imageLink).then(result => {
            $scope.faces = result.data;
            console.log(result);

            // Dựa vào kết quả trả về để set style động cho class idol-face
            $scope.faceDisplay = result.data.map(rs => {
                return {
                    style: {
                        top: rs.face.top + 'px',
                        left: rs.face.left + 'px',
                        width: rs.face.width + 'px',
                        height: rs.face.height + 'px'
                    },
                    name: rs.idol.name
                }
            });
            $scope.isLoading = false;
        });
    }

    // Danh sách ảnh để test
    $scope.testImages = [
        "https://thegioidienanh.vn/stores/news_dataimages/hath/022020/15/11/5800_hoang_thuy_linh_tgda.jpg",
        "https://dep.com.vn/wp-content/uploads/2018/08/angelaphuongtrinh_babyg_deponline_02-20180810.jpg", 
        "http://media.ngoisao.vn/resize_580/news/2014/11/30/miu-le-20.jpg", 
        "http://static.giaoducthoidai.vn/uploaded/hainv/2016_01_27/images16422691452168028hotgirlhaiphongxinhnhumong191657_uzve.jpg?width=500"];

    // Danh sách idol
    $scope.idols = [
        "Ngọc Trinh",
        "Bà tưng",
        "Hường Hana",
        "Hoàng Thùy Linh",
        "Elly Trần",
        "Thuỷ Top",
        "Tâm Tít",
        "Midu",
        "Miu Lê",
        "Chi Pu",
        "Khả Ngân",
        "Angela Phương Trinh"
    ];
});