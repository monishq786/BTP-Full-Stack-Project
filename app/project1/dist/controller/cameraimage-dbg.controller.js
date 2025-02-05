sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {

    "use strict";

    return Controller.extend("project1.controller.cameraimage", {
        stream: null,
        onInit() {
        },

        onOpenCamera: function () {
            const that = this;

            // Stop any existing camera stream before opening a new one
            if (that.stream) {
                that._stopCameraStream();
            }

            // Toggle between front & back cameras
            if (!that.cameraFacingMode || that.cameraFacingMode === "user") {
                that.cameraFacingMode = "environment"; // Switch to back camera
            } else {
                that.cameraFacingMode = "user"; // Switch to front camera
            }

            // Define media constraints
            const constraints = {
                video: {
                    facingMode: { ideal: that.cameraFacingMode }, // Toggle between user & environment
                    width: { ideal: 1280 }, // Adjust resolution
                    height: { ideal: 720 }
                }
            };

            // Check if mediaDevices API is available
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(function (stream) {
                        that.stream = stream; // Store the stream

                        // Inject video element inside the UI5 HTML control
                        that.getView().byId("videoContainer").setContent(
                            `<video id="liveVideo" autoplay playsinline style="width: 85%; height: 85%;"></video>`
                        );

                        // Assign stream to video element
                        setTimeout(() => {
                            const video = document.getElementById("liveVideo");
                            if (video) {
                                video.srcObject = stream;
                                that.getView().byId("captureButton").setVisible(true);
                                that.getView().byId("toggleCameraButton").setVisible(true);
                            }
                        }, 500);
                    })
                    .catch(function (err) {
                        console.error("Camera error:", err);
                        MessageToast.show("Camera access denied or unavailable.");
                    });
            } else {
                MessageToast.show("Camera not supported on this device.");
            }
        },

        onCaptureImage: function () {
            const that = this;
            const video = document.getElementById("liveVideo");

            if (!video) {
                MessageToast.show("Camera is not active.");
                return;
            }

            // Create a canvas to capture the frame
            const canvas = document.createElement("canvas");
            canvas.width = 540;
            canvas.height = 480;
            const ctx = canvas.getContext("2d");

            // Draw the current video frame onto the canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert image to Base64
            const imageData = canvas.toDataURL("image/png");

            // Stop the camera stream
            that._stopCameraStream();

            // Remove video element after capturing
            that.getView().byId("videoContainer").setContent("");

            // Update the SAPUI5 Image control with the captured image
            const oImage = that.getView().byId("capturedImage");
            oImage.setSrc(imageData);
            oImage.setVisible(true);

            MessageToast.show("Image captured successfully!");
            this.onRecognizePlate();
            console.log("Base64 Image Data:", imageData); // Debugging
        },

        _stopCameraStream: function () {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                this.stream = null;
            }
        },

        onRecognizePlate: function () {
            const capturedImageSrc = this.byId("capturedImage").getSrc();

            if (!capturedImageSrc) {
                MessageToast.show("No image captured.");
                return;
            }
            sap.ui.core.BusyIndicator.show(0);
            const ocrApiUrl = "https://api.platerecognizer.com/v1/plate-reader/";
            const apiKey = "655598879ee69682f41181fd0f3e1ed663195c5b";

            // Convert Base64 image to a Blob
            function base64ToBlob(base64) {
                const byteCharacters = atob(base64.split(",")[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                return new Blob([byteArray], { type: "image/png" });
            }

            const imageBlob = base64ToBlob(capturedImageSrc);
            const formData = new FormData();
            formData.append("upload", imageBlob, "captured_plate.png");
            formData.append("regions", "ae-du"); // UAE region

            // Send image to OCR service
            fetch(ocrApiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${apiKey}`
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        const plateNum = data.results[0].plate.toUpperCase();
                        if (data.results[0].color.length > 0) {
                            const plateColor = data.results[0].color.reduce((max, item) => (item.score > max.score ? item : max));
                            this.byId("plateColor").setValue(plateColor.color);
                        } else {
                            this.byId("plateColor").setValue('No Color Fetch');
                        }

                        const plateRegion = data.results[0].region;

                        this.byId("plateNum").setValue(plateNum);

                        this.byId("plateRegion").setValue(plateRegion.code.toUpperCase());

                        sap.ui.core.BusyIndicator.hide();
                        MessageToast.show("Number plate recognized successfully!");
                        var oPage = this.getView().byId("cameraPage");

                        // Scroll to the top
                        if (oPage) {
                            oPage.getScrollDelegate().scrollTo(0, 0, 500); // 500ms animation

                        }

                    } else {
                        sap.ui.core.BusyIndicator.hide();
                        this.byId("plateNum").setValue("No plate detected.");
                        MessageToast.show("Failed to recognize number plate.");
                    }
                })
                .catch(err => {
                    console.error("OCR Error: ", err);
                    MessageToast.show("Failed to recognize number plate.");
                })

        },
        backToLanding: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteLanding", {}, true);
        }

    });

});