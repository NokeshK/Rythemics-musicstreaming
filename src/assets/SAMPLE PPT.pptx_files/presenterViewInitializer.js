"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var FrameContainerContextPV = (function () {
    function FrameContainerContextPV() {
        this.listeners = new Map();
    }
    FrameContainerContextPV.prototype.postMessageDownward = function (message) {
        window.postMessage({
            message: JSON.stringify(message),
            direction: 'downward'
        }, window.location.origin);
    };
    FrameContainerContextPV.prototype.addMessageListener = function (listener) {
        var wrappedListener = function (domEvent) {
            var direction = domEvent.data ? domEvent.data.direction : undefined;
            if (direction === 'downward')
                return;
            listener(direction && domEvent.data.message ? new MessageEvent('message', { data: domEvent.data.message }) : domEvent);
        };
        this.listeners.set(listener, wrappedListener);
        window.addEventListener('message', wrappedListener);
    };
    FrameContainerContextPV.prototype.removeEventListener = function (listener) {
        var wrappedListener = this.listeners.get(listener);
        if (wrappedListener) {
            window.removeEventListener('message', wrappedListener);
            this.listeners.delete(listener);
        }
    };
    return FrameContainerContextPV;
}());
var UnifiedSlideShowSyncSession = (function () {
    function UnifiedSlideShowSyncSession(logger, stateServiceClient, slideShowAPI, appEvents, exitFromPresenterView) {
        this.logger = logger;
        this.stateServiceClient = stateServiceClient;
        this.slideShowAPI = slideShowAPI;
        this.appEvents = appEvents;
        this.exitFromPresenterView = exitFromPresenterView;
    }
    UnifiedSlideShowSyncSession.prototype.close = function () {
        this.stateServiceClient.close();
        this.slideShowAPI.close();
        this.appEvents.removeAllListeners();
        if (this.exitFromPresenterView) {
            window.removeEventListener('message', this.exitFromPresenterView);
        }
        this.logger.sendTraceTag(0x1e3e220d, logCategory.PptSession, logLevel.Info, 'Closed Unified App slideshow sync session');
    };
    ;
    return UnifiedSlideShowSyncSession;
}());
var PresenterViewInitializer = (function () {
    function PresenterViewInitializer(paramData, PresenterViewApp, SyncBridgeApp, SlideShowAPI, jsDownloadTime, aspxTime, logger, StateServiceClient, earlyFormSubmitEnabled) {
        this.c_progressiveLoaderDivId = 'progressive-loader-container';
        this.c_progressiveLoaderStyleId = 'progressive-loader-style';
        this.c_popUpWindowIframeName = 'popup-window-iframe';
        this.presenterViewParameters = paramData;
        this.pvSessionId = this.presenterViewParameters['CallId'];
        this.logger = logger;
        this.logger.sendTraceTag(0x1e3e2286, logCategory.PptSession, logLevel.Info, 'Compiling PresenterViewApp settings');
        this.PresenterViewApp = PresenterViewApp;
        this.SyncBridgeApp = SyncBridgeApp;
        this.SlideShowAPI = SlideShowAPI;
        this.StateServiceClient = StateServiceClient;
        this.presenterViewEnabled = true;
        this.isMovePresenterNameToPPTEnabled = this.presenterViewParameters['EnableMovePresenterNameToPPT'];
        this.earlyFormSubmitEnabled = !!earlyFormSubmitEnabled;
        this.fileInfo = {
            podsUrl: this.presenterViewParameters['PodsUrl'],
            docId: this.presenterViewParameters['DocId'],
            fileExtension: this.presenterViewParameters['FileExtensionStr'],
            remoteTelemetryUrl: this.presenterViewParameters['PodsUrl'] + "RemoteTelemetry.ashx",
            datacenter: this.presenterViewParameters['StartingDatacenter'],
            ariaEndpointTarget: this.presenterViewParameters['AriaEndpointTarget'],
            originalFileExtension: this.presenterViewParameters['OriginalFileExtension'],
            presentUrl: this.presenterViewParameters['PresentUrl'],
        };
        if (!this.earlyFormSubmitEnabled) {
            this.fileInfo.fileUrl = this.htmlDecodeWithDOMParser(this.presenterViewParameters['FileUrl']);
        }
        this.sessionInfo = {
            userSessionId: this.presenterViewParameters['UserSessionId'],
            hostSessionId: this.presenterViewParameters['UserSessionId'],
            uiHost: "Unified App",
            uiHostRing: this.presenterViewParameters['Ring'],
            applicationLcid: this.presenterViewParameters['LanguageCode'],
            applicationLocaleName: this.presenterViewParameters['LanguageName']
        };
        this.slideShowCoreSettings = {
            animatedContentLoggerOptions: {
                minDurationMs: 900,
                worstFrameCount: 5,
                percentiles: [0, 25, 50, 75, 95, 99, 100],
            },
            clickTargetEnabled: true,
            mediaEnabled: true,
            gifEnabled: true,
            convertGifToVideo: true,
            useAnimatableParts: true,
            accessibilityModelEnabled: true,
            transparentCanvasForVideoEnabled: true,
            transitionResourceCDNPath: this.presenterViewParameters['CustomTransitionResourceUrl'],
            endOfShowText: this.presenterViewParameters['EndOfShowText'] || 'End of slide show, click to exit.',
            enableSVGAsWebGLTexture: this.presenterViewParameters['EnableSVGAsWebGLTexture'],
            transitionDisabledList: this.presenterViewParameters['TransitionDisabledList'],
            enableSlideSizeAdjust: this.presenterViewParameters['EnableSlideSizeAdjust'],
            slideSizeDefault: { x: this.presenterViewParameters['DefaultSlideWidth'], y: this.presenterViewParameters['DefaultSlideHeight'] },
            slideSizeMax: { x: this.presenterViewParameters['SlideShowWidthMax'], y: this.presenterViewParameters['SlideShowHeightMax'] },
            slideSizeMin: { x: this.presenterViewParameters['SlideShowWidthMin'], y: this.presenterViewParameters['SlideShowHeightMin'] },
            startingSlideLocation: { slideIndex: this.presenterViewParameters['StartSlideIndex'] },
            useOnlineVideoPlayer: true,
            useNewYoutubePlayer: true,
            useNewVimeoPlayer: true,
            flipgridVideoEnabled: this.presenterViewParameters['FlipgridVideoEnabled'],
            tedVideoEnabled: this.presenterViewParameters['TEDVideoEnabled'],
            maxSvgTextureSize: this.presenterViewParameters['MaxSvgTextureSize'],
            crossSlideAudioEnabled: true,
            shouldDisableEndOfShow: !this.presenterViewParameters['ShouldEnableEndOfShow'],
            slideMetadataEnabled: this.presenterViewParameters['SlideMetadataEnabled'],
            disabledChangeGates: this.presenterViewParameters['DisabledChangeGates'],
            combineBootRequest: true,
            localVideoTelemetryEnabled: this.presenterViewParameters['LocalVideoTelemetryEnabled'],
            prefetchOptions: {
                forwardPrefechCount: this.presenterViewParameters['ForwardPrefechCount'],
                backwardPrefechCount: this.presenterViewParameters['BackwardPrefechCount'],
                forwardPrerenderCount: this.presenterViewParameters['ForwardPrerenderCount'],
                backwardPrerenderCount: this.presenterViewParameters['BackwardPrerenderCount'],
            },
            imageSettings: {
                imageAppendOption: "all",
            },
            presenterViewEducationToastMessageHeadingForPopUpWindow: this.presenterViewParameters['PresenterViewEducationToastMessageHeadingForPopUpWindow'] || 'Presenter View Window',
            presenterViewEducationToastMessageBodyForPopUpWindow: this.presenterViewParameters['PresenterViewEducationToastMessageBodyForPopUpWindow'] || 'Place it in a screen only visible to you',
            isComponentizationEnabled: this.presenterViewParameters['IsComponentizationEnabled'],
            settings: JSON.parse(this.presenterViewParameters['Settings'])
        };
        try {
            var unsafeStringOverridesEnabled = localStorage.getItem('unsafeStringOverridesEnabled');
            var settings = this.slideShowCoreSettings.settings;
            for (var overridePath in settings) {
                if (overridePath.endsWith('_stringoverrides')) {
                    var path = overridePath.replace('_stringoverrides', '');
                    if (!unsafeStringOverridesEnabled) {
                        console.log("Blocked string overrides for path: " + path + ". Run exposed.ssc.enableUnsafeStringOverrides() in the console and try again.");
                    }
                    if (!settings[path]) {
                        settings[path] = {};
                    }
                    Object.assign(settings[path], settings[overridePath]);
                    delete settings[overridePath];
                }
            }
        }
        catch (e) {
            console.log('localStorage disabled. ex:', e);
        }
        this.appSettings = {
            userSessionId: this.sessionInfo.userSessionId,
            ring: this.presenterViewParameters['Ring'],
            fileHost: "UnifiedApp",
            uiHost: this.sessionInfo.uiHost,
            isRtl: this.presenterViewParameters['IsRtl'],
            initTime: Date.now(),
            serverUrl: this.fileInfo.podsUrl,
            scenario: 'Previewer',
            useDocCache: this.presenterViewParameters['UseDocCache'],
            supportMultiRangeRequests: true,
            isPresenterExperienceEnabled: this.presenterViewEnabled,
            isPresenterExperienceInitialVisible: this.presenterViewParameters['IsPresenter'],
            teamsCallId: this.presenterViewParameters['CallId'],
            isResumeSlideShowExperienceEnabled: true,
            isOpticalZoomPopoverEnabled: true,
            slideShowInkJsFilePath: this.presenterViewParameters['SlideShowInkFilePath'],
            isGridViewExperienceEnabled: true,
            resumeSlideShowCacheKey: this.htmlDecodeWithDOMParser(this.presenterViewParameters['FileUrl']),
            serviceRequestTimeout: this.presenterViewParameters['ServiceRequestTimeout'],
            pptSharingWebViewContainerEnabled: false,
            slideShowToolbarEnabledForPresenter: true,
            slideShowToolbarEnabledForAttendee: true,
            slideShowToolbarSvgIconsEnabled: true,
            toggleHighContrastModeEnabled: true,
            slideShowModernToolbarHighContrastToggleButtonEnabled: true,
            slideShowModernToolbarTranslateButtonEnabled: true,
            slideShowModernToolbarShowGridViewToggleButton: true,
            slideShowModernToolbarPrivateViewingToggleButtonEnabled: false,
            slideshowPresenterViewToggleEnabled: true,
            getItemsRetryCount: this.presenterViewParameters['GetItemsRetryCount'],
            getItemsRetryCategories: this.presenterViewParameters['GetItemsRetryCategories'],
            enablethumbnailsAndNotesPrefetch: true,
            thumbnailsAndNotesForwardPrefetchCount: this.presenterViewParameters['PresenterViewForwardPrefetchCount'],
            thumbnailsAndNotesBackwardPrefetchCount: this.presenterViewParameters['PresenterViewBackwardPrefetchCount'],
            isAnnotationsUIEnabled: true,
            jsScriptsBasePath: this.presenterViewParameters['DelayLoadBasePath'],
            enableNotesFontResizing: true,
            enableNotesPaneResizing: false,
            enableCoach: false,
            slideShowViewManagerEnabled: true,
            enableKeyboardInputsForWholePresenterView: true,
            gridViewMaxChunkAmount: this.presenterViewParameters['GridViewMaxChunkAmount'],
            isStateServiceNavTelemetryEnabled: true,
            isStateServiceNavSyncEnabled: true,
            isStateServiceMediaSyncEnabled: true,
            isStateServiceOpticalZoomSyncEnabled: true,
            isMovePrivateViewingToPPTEnabled: false,
            isCursorMoveEventEnabled: true,
            cursorMoveEventIntervalMs: this.presenterViewParameters['AnnotationsCursorMoveEventIntervalMs'],
            cursorMoveIframeBufferZoneInPx: this.presenterViewParameters['AnnotationsCursorMoveIframeBufferZoneInPx'],
            cursorMoveMinDistance: this.presenterViewParameters['AnnotationsCursorMoveMinDistance'],
            isMouseSmoothingEnabled: true,
            mouseSmoothingPressureErrorTolerances: this.presenterViewParameters['AnnotationsMouseSmoothPressureErrorTolerances'],
            mouseSmoothingXYErrorTolerances: this.presenterViewParameters['AnnotationsMouseSmoothXYErrorTolerances'],
            isStraightLineEnabled: true,
            isPressAndHoldEnabled: true,
            pressAndHoldOffsetLimitTolerance: this.presenterViewParameters['AnnotationsPressAndHoldOffsetLimitTolerance'],
            isInstantArrowEnabled: true,
            isInkEffectPensEnabled: true,
            isInstantInkingBehaviorEnabled: true,
            isCustomCursorEnabled: true,
            arrowDirectionTouchThreshold: this.presenterViewParameters['AnnotationsArrowDirectionTouchThreshold'],
            arrowDirectionNonTouchThreshold: this.presenterViewParameters['AnnotationsArrowDirectionNonTouchThreshold'],
            isPersistentLaserCursorEnabled: true,
            enableAdvanceOnClick: true,
            enableKeyboardNavigation: true,
            loggableScriptDomains: this.presenterViewParameters['LoggableScriptDomains'],
            loggableServiceDomains: this.presenterViewParameters['LoggableServiceDomains'],
        };
        this.bootMetrics = {
            startFromTime: this.presenterViewParameters['StartFromTime'],
            aspxTime: aspxTime,
            jsDownloadTime: jsDownloadTime,
        };
        this.logger.sendTraceTag(0x1e3e220f, logCategory.PptSession, logLevel.Info, 'Finished compiling settings for PresenterViewApp');
        this.sessionSettings = {
            slideShowCoreSettings: this.slideShowCoreSettings,
            appSettings: this.appSettings,
            bootMetrics: this.bootMetrics
        };
        var options = {
            fileInfo: this.fileInfo,
            sessionSettings: this.sessionSettings,
            disabledChangeGates: this.sessionSettings.slideShowCoreSettings.disabledChangeGates,
            vetoSessionId: this.sessionSettings.appSettings.userSessionId,
        };
        if (this.PresenterViewApp.setupGlobals_SlideShowCore) {
            this.PresenterViewApp.setupGlobals_SlideShowCore(options);
        }
        this.logger.sendTraceTag(0x1e3e220e, logCategory.PptSession, logLevel.Info, 'Finished creating initializer');
    }
    PresenterViewInitializer.prototype.getAppSettings = function () {
        return this.appSettings;
    };
    PresenterViewInitializer.prototype.preloadSnapIndependentElements = function () {
        try {
            var resourcePreloadInitTime = Date.now();
            this.resourcePreloadPromise = this.loadResourceFiles(this.PresenterViewApp.globalLogger);
            var apiAndContainerCreationTime = Date.now();
            this.preloadedSlideShowAPI = new this.SlideShowAPI(this.sessionInfo.hostSessionId, this.slideShowCoreSettings.disabledChangeGates, {
                pptSharingWebViewContainerEnabled: this.appSettings.pptSharingWebViewContainerEnabled
            });
            this.preloadedSlideShowUIContainers = this.loadSlideShowUIContainers();
            var shaderPreloadTime = Date.now();
            this.PresenterViewApp.preloadShaders();
            this.logger.sendTraceTag(0x1e351862, logCategory.PptSession, logLevel.Warning, "Snap independent execution complete, pvSessionId: " + this.pvSessionId + ", resourcePreloadInit: " + resourcePreloadInitTime + ", apiAndContainerCreation: " + apiAndContainerCreationTime + ", shaderPreload: " + shaderPreloadTime + ", completion: " + Date.now());
        }
        catch (e) {
            var processedError = void 0;
            try {
                processedError = ErrorStackSanitizer.parseError(e, e.fileName, e.lineNumber, e.columnNumber);
            }
            catch (e) {
                this.logger.sendTraceTag(0x1e351861, logCategory.PptSession, logLevel.Error, "Error sanitization failed");
                processedError = e;
            }
            this.logger.sendTraceTag(0x1e351860, logCategory.PptSession, logLevel.Error, "PresenterViewApp snap independent preload failed with exception: " + processedError.message + ". ErrorName: " + processedError.name + ", pvSessionId: " + this.pvSessionId + ", Line: " + processedError.lineNumber + ", Stack: " + processedError.stack);
        }
    };
    PresenterViewInitializer.prototype.updateSnapDetails = function (fileUrl, enableUsePresentFrontdoor) {
        this.fileInfo.fileUrl = fileUrl;
        this.fileInfo.enableUsePresentFrontdoor = enableUsePresentFrontdoor;
    };
    PresenterViewInitializer.prototype.loadSlideShowUIContainers = function () {
        var slideShowUIContainers = {};
        var root = document.querySelector('#ppt-previewer-root');
        slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.SlideShowUIRootContainer] = root;
        if (PresenterViewUIBootInterfaces.SlideShowUIContainerNames.SlideShowTop != null) {
            slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.SlideShowTop] = document.querySelector('#slideshow-parent-container');
        }
        if (this.presenterViewEnabled) {
            slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.ThumbnailStrip] = document.querySelector('#slideshow-app-thumbnail-strip');
            slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.NotesPane] = document.querySelector('#slideshow-app-notes-pane');
        }
        slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.ResumeSlideShow] = document.querySelector('#slideshow-app-resume-slideshow');
        slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.OpticalZoomPopover] = document.getElementById('slideshow-app-optical-zoom-popover');
        slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.SlideShowToolbar] = document.querySelector('#slideshow-toolbar');
        var toolbarContainer = document.querySelector('#slideshow-toolbar');
        if (toolbarContainer) {
            toolbarContainer.classList.add("slideshow-toolbar-root-container-class");
            if (this.isMovePresenterNameToPPTEnabled) {
                toolbarContainer.classList.add("slideshow-toolbar-remove-bottom-margin");
            }
        }
        slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.GridView] = document.querySelector('#slideshow-app-grid-view');
        slideShowUIContainers[PresenterViewUIBootInterfaces.SlideShowUIContainerNames.SlideShowAndToolbarContainer] = document.querySelector('#slideshow-app-left');
        return slideShowUIContainers;
    };
    PresenterViewInitializer.prototype.loadResourceFiles = function (logger) {
        var maxTimesToFetchFailureHeaders = 0;
        if (Number.isInteger(this.presenterViewParameters['SSResourceLoaderMaxTimesToFetchHeaders'])) {
            maxTimesToFetchFailureHeaders = this.presenterViewParameters['SSResourceLoaderMaxTimesToFetchHeaders'];
        }
        var resourceLoader = new PresenterViewApp.SlideShowResourceLoader(logger, maxTimesToFetchFailureHeaders);
        resourceLoader.jsFilePathMap[PresenterViewApp.SlideShowJsFileNames.SlideShowUIStringJs] = this.presenterViewParameters['SlideShowUIStringsJsPathV2'];
        if (!!this.presenterViewParameters['CustomElementsPolyfillFilePath']) {
            resourceLoader.jsFilePathMap[PresenterViewApp.SlideShowJsFileNames.CustomElementsJs] = this.presenterViewParameters['CustomElementsPolyfillFilePath'];
        }
        resourceLoader.jsFilePathMap[PresenterViewApp.SlideShowJsFileNames.FocusVisibleJs] = this.presenterViewParameters['FocusVisiblePolyfillFilePath'];
        resourceLoader.jsFilePathMap[PresenterViewApp.SlideShowJsFileNames.SlideGridJs] = this.presenterViewParameters['SlideGridJsFilePath'];
        resourceLoader.jsFilePathMap[PresenterViewApp.SlideShowJsFileNames.PresenterViewUIJs] = this.presenterViewParameters['PresenterViewUIJsFilePath'];
        if (!!this.presenterViewParameters['PresenterViewUIComponentsJsFilePath']) {
            resourceLoader.jsFilePathMap[PresenterViewApp.SlideShowJsFileNames.PresenterViewUIComponentsJs] = this.presenterViewParameters['PresenterViewUIComponentsJsFilePath'];
        }
        resourceLoader.jsFilePathMap[PresenterViewApp.SlideShowJsFileNames.SlideShowUIIconJs] = this.presenterViewParameters['SlideShowUIIconsJsPath'];
        resourceLoader.cssFilePathMap[PresenterViewApp.SlideShowCssFileNames.PPTGridComponentCss] = this.presenterViewParameters['SlideGridCssFilePath'];
        resourceLoader.cssFilePathMap[PresenterViewApp.SlideShowCssFileNames.PresenterCss] = this.presenterViewParameters['PresenterViewCssFilePath'];
        if (!!this.presenterViewParameters['ResumeSlideShowCssFilePath']) {
            resourceLoader.cssFilePathMap[PresenterViewApp.SlideShowCssFileNames.ResumeslideshowCss] = this.presenterViewParameters['ResumeSlideShowCssFilePath'];
        }
        resourceLoader.cssFilePathMap[PresenterViewApp.SlideShowCssFileNames.FloatingContainerCss] = this.presenterViewParameters['FloatingContainerCssFilePath'];
        resourceLoader.cssFilePathMap[PresenterViewApp.SlideShowCssFileNames.GridviewCss] = this.presenterViewParameters['GridViewCssFilePath'];
        if (!!this.presenterViewParameters['SlideShowToolbarCssFilePath']) {
            resourceLoader.cssFilePathMap[PresenterViewApp.SlideShowCssFileNames.SlideshowtoolbarCss] = this.presenterViewParameters['SlideShowToolbarCssFilePath'];
        }
        resourceLoader.cssFilePathMap[PresenterViewApp.SlideShowCssFileNames.ToolbarIconsCss] = this.presenterViewParameters['ToolbarIconsCssFilePath'];
        if (this.isMovePresenterNameToPPTEnabled) {
            resourceLoader.cssFilePathMap[PresenterViewApp.SlideShowCssFileNames.FloatinglabelCss] = this.presenterViewParameters['FloatingLabelCssFilePath'];
        }
        return resourceLoader.loadResourceFiles();
    };
    PresenterViewInitializer.prototype.initPresenterViewApp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var slideShowAPI, presenterViewApp_1, slideShowAppParent, slideShowUIContainers, appContainerSetupTime, shaderPreloadTime, pvAppEvents, appLaunchTime, resourceLoadTime, slideShowUIEvents, postBootTime, pvParentWindow, e_1, processedError;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.sendTraceTag(0x1e3d9213, logCategory.PptSession, logLevel.Info, 'Initializing PresenterViewApp');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 9, , 10]);
                        slideShowAPI = this.earlyFormSubmitEnabled && this.preloadedSlideShowAPI
                            ? this.preloadedSlideShowAPI
                            : new this.SlideShowAPI(this.sessionInfo.hostSessionId, this.slideShowCoreSettings.disabledChangeGates, {
                                pptSharingWebViewContainerEnabled: this.appSettings.pptSharingWebViewContainerEnabled
                            });
                        slideShowAppParent = document.querySelector("#ppt-slideshow-app-area");
                        slideShowUIContainers = this.earlyFormSubmitEnabled
                            ? this.preloadedSlideShowUIContainers
                            : this.loadSlideShowUIContainers();
                        appContainerSetupTime = Date.now();
                        presenterViewApp_1 = new this.PresenterViewApp(slideShowAppParent, this.fileInfo, this.sessionInfo, this.sessionSettings, slideShowUIContainers, undefined, this.earlyFormSubmitEnabled ? true : undefined);
                        if (!this.earlyFormSubmitEnabled) {
                            presenterViewApp_1.preloadShaders();
                        }
                        shaderPreloadTime = Date.now();
                        if (!(presenterViewApp_1 != null)) return [3, 7];
                        this.logger.sendTraceTag(0x1e3e220c, logCategory.PptSession, logLevel.Info, 'Calling launchApp');
                        pvAppEvents = presenterViewApp_1.slideShowAppEvents;
                        pvAppEvents.on('slideShowRenderedToCanvas', function () {
                            _this.removeProgressiveLoaderFromPopUpWindow();
                        });
                        return [4, slideShowAPI.launchApp(presenterViewApp_1)];
                    case 2:
                        _a.sent();
                        appLaunchTime = Date.now();
                        if (!(this.earlyFormSubmitEnabled && this.resourcePreloadPromise)) return [3, 4];
                        return [4, this.resourcePreloadPromise];
                    case 3:
                        _a.sent();
                        return [3, 6];
                    case 4: return [4, this.loadResourceFiles(presenterViewApp_1.logger)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        resourceLoadTime = Date.now();
                        slideShowUIEvents = PresenterViewUI.SlideShowUIEventsFactory.createSlideShowUIEvents();
                        presenterViewApp_1.postBoot(slideShowUIEvents);
                        postBootTime = Date.now();
                        this.logger.sendTraceTag(0x1e387057, logCategory.PptSession, logLevel.Warning, "Initialized PresenterViewApp, pvSessionId: " + this.pvSessionId + ", appContainerSetup: " + appContainerSetupTime + ", shaderPreload: " + shaderPreloadTime + ", appLaunch: " + appLaunchTime + ", resourceLoad: " + resourceLoadTime + ", postBoot: " + postBootTime);
                        if (this.presenterViewParameters['DynamicWatermarkingEnabled']) {
                            pvParentWindow = window.parent;
                            if (pvParentWindow.dynamicWatermarkingPromise) {
                                pvParentWindow.dynamicWatermarkingPromise.then(function (dynamicWatermarkLabel) {
                                    if (dynamicWatermarkLabel && dynamicWatermarkLabel.length > 0) {
                                        presenterViewApp_1.renderDynamicWatermark(dynamicWatermarkLabel);
                                    }
                                });
                            }
                            else {
                                this.logger.sendTraceTag(0, logCategory.PptSession, logLevel.Error, "dynamicWatermarkingPromise doesnt exist, pvSessionId: " + this.pvSessionId);
                            }
                        }
                        return [3, 8];
                    case 7:
                        this.logger.sendTraceTag(0x1e3e220b, logCategory.PptSession, logLevel.Error, "presenterViewApp is null, pvSessionId: " + this.pvSessionId);
                        _a.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        e_1 = _a.sent();
                        processedError = void 0;
                        try {
                            processedError = ErrorStackSanitizer.parseError(e_1, e_1.fileName, e_1.lineNumber, e_1.columnNumber);
                        }
                        catch (e) {
                            this.logger.sendTraceTag(0x1e3e2292, logCategory.PptSession, logLevel.Error, "Error sanitization failed");
                            processedError = e;
                        }
                        this.logger.sendTraceTag(0x1e3e2291, logCategory.PptSession, logLevel.Error, "PresenterViewApp initialization failed with exception: " + processedError.message + ". ErrorName: " + processedError.name + ", pvSessionId: " + this.pvSessionId + ", Line: " + processedError.lineNumber + ", Stack: " + processedError.stack);
                        return [3, 10];
                    case 10:
                        if (!!this.presenterViewParameters['FlushLogsOnBootComplete']) {
                            this.logger.flush();
                        }
                        return [2];
                }
            });
        });
    };
    PresenterViewInitializer.prototype.removeProgressiveLoaderFromPopUpWindow = function () {
        var loaderContainer = parent.document.getElementById(this.c_progressiveLoaderDivId);
        var styleElement = parent.document.getElementById(this.c_progressiveLoaderStyleId);
        if (loaderContainer) {
            loaderContainer.remove();
        }
        else {
            this.logger.sendTraceTag(0, logCategory.PptSession, logLevel.Error, "PresenterViewInitializer: removeProgressiveLoaderFromPopUpWindow loaderContainer not found");
        }
        if (styleElement) {
            styleElement.remove();
        }
        else {
            this.logger.sendTraceTag(0, logCategory.PptSession, logLevel.Error, "PresenterViewInitializer: removeProgressiveLoaderFromPopUpWindow loaderContainerStyleElemnt not found");
        }
        var popupIframe = parent.document.getElementsByName(this.c_popUpWindowIframeName)[0];
        if (popupIframe) {
            var styleValue = popupIframe.getAttribute('style');
            if (styleValue && styleValue.includes('display:none')) {
                popupIframe.removeAttribute('style');
                popupIframe.setAttribute('style', 'width:100%; height:100%; border:0; min-height:470px; min-width:700px;');
            }
        }
        else {
            this.logger.sendTraceTag(0, logCategory.PptSession, logLevel.Error, "PresenterViewInitializer: removeProgressiveLoaderFromPopUpWindow popupIframe not found");
        }
    };
    PresenterViewInitializer.prototype.initStateServiceClient = function (forUnifiedSyncSession) {
        return __awaiter(this, void 0, void 0, function () {
            var stateServiceClientSettings, frameContainerContext, stateServiceClient, stateServiceProxySettingsMetadata, stateServiceProxySettings, enabledStateServiceFeatures, stateServiceSessionKey, fSuccessfulInit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.sendTraceTag(0x1e3e220a, logCategory.PptSession, logLevel.Info, "Initializing StateServiceClient, forUnifiedSyncSession: " + !!forUnifiedSyncSession);
                        stateServiceClientSettings = {
                            webviewContainerEnabled: true,
                            clientType: this.presenterViewParameters['StateServiceClientType'],
                            configName: this.presenterViewParameters['StateServiceConfigName'],
                        };
                        frameContainerContext = new FrameContainerContextPV();
                        stateServiceClient = new this.StateServiceClient(stateServiceClientSettings, frameContainerContext);
                        stateServiceProxySettingsMetadata = {
                            HostName: "Unified App",
                            Ring: this.presenterViewParameters['Ring']
                        };
                        stateServiceProxySettings = {
                            batchedRequestsEnabled: false,
                            maxRoundtripRaw: 300,
                            pingTimeoutInMs: 15000,
                            pongTimeoutInMs: 15000,
                            retryIntervalsInMs: [1000, 2000, 4000],
                            verbose: false,
                            websocketAliveTimeAfterLoseFocusInMS: 30000,
                            maxSessionRetries: 15,
                            autoRoutingEnabled: true,
                            offlineMessageCacheEnabled: true,
                            maxOfflineMessageCacheTimeInMs: 20000,
                            maxOfflineMessageCacheLength: 64,
                            allowReconnectOnSendMessage: true,
                            unacknowledgeMessageTimeoutInMs: 12000,
                            useServiceGeneratedClientId: true,
                            correlationId: this.presenterViewParameters['UserSessionId'],
                            metadata: stateServiceProxySettingsMetadata
                        };
                        enabledStateServiceFeatures = ["Nav", "NavSync", "AddinStateSync", "Ink", "Media", "BlankSlideState", "Cameo", "Subtitles", "OpticalZoomSync"];
                        stateServiceSessionKey = this.presenterViewParameters['StateServiceSessionKey'] ? this.presenterViewParameters['StateServiceSessionKey'] : this.sessionInfo.userSessionId;
                        return [4, stateServiceClient.init(stateServiceProxySettings, this.presenterViewParameters['UseInternalStateServiceEndpoint'], this.logger, this.sessionInfo.userSessionId, true, this.presenterViewParameters['CallId'], this.fileInfo.fileUrl, enabledStateServiceFeatures, undefined, undefined, undefined, undefined, undefined, undefined, stateServiceSessionKey, {
                                rosterCheckEnabled: false
                            })];
                    case 1:
                        fSuccessfulInit = _a.sent();
                        if (fSuccessfulInit) {
                            this.logger.sendTraceTag(0x1e3e2209, logCategory.PptSession, logLevel.Warning, "StateServiceClient initialized, pvSessionId: " + this.pvSessionId + ", time: " + Date.now() + ", forUnifiedSyncSession: " + !!forUnifiedSyncSession);
                        }
                        else {
                            this.logger.sendTraceTag(0x1e3e2208, logCategory.PptSession, logLevel.Error, "StateServiceClient initialization failed, pvSessionId: " + this.pvSessionId + ", forUnifiedSyncSession: " + !!forUnifiedSyncSession);
                        }
                        return [2, stateServiceClient];
                }
            });
        });
    };
    PresenterViewInitializer.prototype.updateParameters = function (fileUrl, callId, stateServiceSessionKey) {
        this.appSettings.resumeSlideShowCacheKey = fileUrl;
        this.fileInfo.fileUrl = fileUrl;
        this.pvSessionId = callId;
        this.presenterViewParameters['CallId'] = callId;
        this.presenterViewParameters['StateServiceSessionKey'] = stateServiceSessionKey;
        this.appSettings.teamsCallId = callId;
    };
    PresenterViewInitializer.prototype.launchUnifiedSlideShowSyncSession = function (fileUrl, slideShowCoreConnector, syncAddonsConnector, podsProxy, appEvents, callId, exitFromPresenterView, uiSyncConnector, stateServiceSessionKey) {
        return __awaiter(this, void 0, void 0, function () {
            var stateServiceClient, syncBridgeApp, slideShowAPI, syncBridgeAppLaunchTime, e_2, processedError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.sendTraceTag(0x1e3d9212, logCategory.PptSession, logLevel.Info, 'Initializing SyncBridgeApp for PresenterView');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        window.addEventListener('message', function (event) {
                            if (event.origin == window.location.origin && event.data && event.data.type && event.data.type === 'exitPresenterView') {
                                exitFromPresenterView();
                            }
                        });
                        this.updateParameters(fileUrl, callId, stateServiceSessionKey);
                        return [4, this.initStateServiceClient(true)];
                    case 2:
                        stateServiceClient = _a.sent();
                        syncBridgeApp = new this.SyncBridgeApp(this.sessionInfo, this.sessionSettings, slideShowCoreConnector, syncAddonsConnector, appEvents, podsProxy, uiSyncConnector);
                        this.logger.sendTraceTag(0x1e3d9211, logCategory.PptSession, logLevel.Info, 'Calling SyncBridgeApp launchApp');
                        slideShowAPI = new this.SlideShowAPI(this.sessionInfo.hostSessionId, this.slideShowCoreSettings.disabledChangeGates, {
                            pptSharingWebViewContainerEnabled: this.appSettings.pptSharingWebViewContainerEnabled
                        });
                        return [4, slideShowAPI.launchApp(syncBridgeApp)];
                    case 3:
                        _a.sent();
                        syncBridgeAppLaunchTime = Date.now();
                        this.logger.sendTraceTag(0x1e387056, logCategory.PptSession, logLevel.Warning, "Launched UnifiedSlideShowSyncSession, pvSessionId: " + this.pvSessionId + ", time: " + syncBridgeAppLaunchTime);
                        return [2, new UnifiedSlideShowSyncSession(this.logger, stateServiceClient, slideShowAPI, appEvents, exitFromPresenterView)];
                    case 4:
                        e_2 = _a.sent();
                        processedError = void 0;
                        try {
                            processedError = ErrorStackSanitizer.parseError(e_2, e_2.fileName, e_2.lineNumber, e_2.columnNumber);
                        }
                        catch (e) {
                            this.logger.sendTraceTag(0x1e3d9210, logCategory.PptSession, logLevel.Error, "Error sanitization failed");
                            processedError = e;
                        }
                        this.logger.sendTraceTag(0x1e3d920f, logCategory.PptSession, logLevel.Error, "SyncBridgeApp initialization failed with exception: " + processedError.message + ". ErrorName: " + processedError.name + ", pvSessionId: " + this.pvSessionId + ", Line: " + processedError.lineNumber + ", Stack: " + processedError.stack);
                        throw 'Unified App slideshow sync initialization failed';
                    case 5: return [2];
                }
            });
        });
    };
    PresenterViewInitializer.prototype.htmlDecodeWithDOMParser = function (inputString) {
        var doc = new DOMParser().parseFromString(inputString, 'text/html');
        return doc.documentElement.textContent;
    };
    return PresenterViewInitializer;
}());
var LoggingHelper = (function () {
    function LoggingHelper(logger, pvSessionId) {
        this.logger = logger;
        this.pvSessionId = pvSessionId;
    }
    LoggingHelper.prototype.logScriptLoadSuccess = function (scriptName) {
        this.logger.ULS.traceTag(0x1e3e2698, logCategory.PptSession, logLevel.Info, "Loaded script: " + scriptName + ", pvSessionId: " + this.pvSessionId);
    };
    LoggingHelper.prototype.logScriptLoadFailure = function (scriptName) {
        this.logger.ULS.traceTag(0x1e3e2290, logCategory.PptSession, logLevel.Error, "Failed to load script: " + scriptName + ", pvSessionId: " + this.pvSessionId);
    };
    LoggingHelper.prototype.logInfo = function (message) {
        this.logger.ULS.traceTag(0x1e3e228f, logCategory.PptSession, logLevel.Info, message + ", pvSessionId: " + this.pvSessionId);
    };
    LoggingHelper.prototype.logTimestamps = function (aspxLoadStartTime, jsDownloadStartTime, jsDownloadEndTime, initializerCreationTime, appInitTime, stateServiceInitTime, postInitTriggerTime) {
        this.logger.ULS.traceTag(0x1e38705b, logCategory.PptSession, logLevel.Warning, "Page timestamps, aspxLoad: " + aspxLoadStartTime + ", jsStart: " + jsDownloadStartTime + ", jsEnd: " + jsDownloadEndTime + ", init: " + initializerCreationTime + ", appinitStart: " + appInitTime + ", ssInitStart: " + stateServiceInitTime + ", postInit: " + postInitTriggerTime + ", pvSessionId: " + this.pvSessionId);
    };
    LoggingHelper.prototype.logError = function (message, err) {
        var processedError;
        try {
            processedError = ErrorStackSanitizer.parseError(err, err.fileName, err.lineNumber, err.columnNumber);
        }
        catch (e) {
            this.logger.ULS.traceTag(0x1e3e0819, logCategory.PptSession, logLevel.Error, "Error sanitization failed, pvSessionId: " + this.pvSessionId);
            processedError = err;
        }
        this.logger.ULS.traceTag(0x1e3e0818, logCategory.PptSession, logLevel.Error, message + ": " + processedError.message + ". ErrorName: " + processedError.name + ", pvSessionId: " + this.pvSessionId + ", Line: " + processedError.lineNumber + ", Stack: " + processedError.stack);
    };
    return LoggingHelper;
}());
var StackFrame = (function () {
    function StackFrame(functionName, fileName, lineNumber, columnNumber, source) {
        this.functionName = functionName;
        this.fileName = fileName;
        this.columnNumber = columnNumber;
        this.lineNumber = lineNumber;
        this.source = source;
    }
    StackFrame.prototype.toString = function () {
        return "fileName: " + this.fileName + " functionName: " + this.functionName + " colNo: " + this.columnNumber + " lineNo: " + this.lineNumber;
    };
    return StackFrame;
}());
var ParsedStack = (function () {
    function ParsedStack(failedToParse, stackFrames) {
        this.failedToParse = failedToParse;
        this.stackFrames = stackFrames;
    }
    return ParsedStack;
}());
var ErrorStackSanitizer = (function () {
    function ErrorStackSanitizer() {
    }
    ErrorStackSanitizer.sanitizeUrl = function (url) {
        try {
            if (!url) {
                return undefined;
            }
            var a = document.createElement('a');
            a.href = url;
            return a.pathname.substring(a.pathname.lastIndexOf('/') + 1);
        }
        catch (e) {
            return undefined;
        }
    };
    ErrorStackSanitizer.parseError = function (e, filename, lineno, colno) {
        var stack = '';
        var stackFrames = [];
        stackFrames = ErrorStackSanitizer.parse(e).stackFrames;
        for (var _i = 0, stackFrames_1 = stackFrames; _i < stackFrames_1.length; _i++) {
            var stackFrame = stackFrames_1[_i];
            if (stackFrame.fileName) {
                stackFrame.fileName = ErrorStackSanitizer.sanitizeUrl(stackFrame.fileName);
            }
            if (stack) {
                stack += '\n';
            }
            stack += stackFrame.toString();
        }
        return {
            message: e.message,
            name: e.name,
            fileName: ErrorStackSanitizer.sanitizeUrl(filename),
            lineNumber: lineno,
            columnNumber: colno,
            stack: stack,
        };
    };
    ErrorStackSanitizer.parse = function (error) {
        if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
            return new ParsedStack(true, []);
        }
        else if (error.stack && error.stack.match(ErrorStackSanitizer.ChromeIEStackRegexp)) {
            return this.parseV8OrIE(error);
        }
        else if (error.stack) {
            return this.parseFFOrSafari(error);
        }
        else {
            return new ParsedStack(true, []);
        }
    };
    ErrorStackSanitizer.extractLocation = function (urlLike) {
        if (urlLike) {
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }
            var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
            if (parts) {
                return [parts[1], parts[2] || undefined, parts[3] || undefined];
            }
        }
        return [];
    };
    ErrorStackSanitizer.parseV8OrIE = function (error) {
        var filtered = error.stack.split('\n').filter(function (line) {
            return !!line.match(ErrorStackSanitizer.ChromeIEStackRegexp);
        });
        var stackFrames = filtered.map(function (line) {
            if (line.indexOf('(eval ') > -1) {
                line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
            }
            var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '(');
            var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
            sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;
            var tokens = sanitizedLine.split(/\s+/).slice(1);
            var locationParts = ErrorStackSanitizer.extractLocation(location ? location[1] : tokens.pop());
            var functionName = tokens.join(' ') || undefined;
            var fileName = locationParts[0] ? (['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0]) : "";
            return new StackFrame(functionName, fileName, locationParts[1], locationParts[2], line);
        });
        return new ParsedStack(false, stackFrames);
    };
    ErrorStackSanitizer.parseFFOrSafari = function (error) {
        var _this = this;
        var filtered = error.stack.split('\n').filter(function (line) {
            return !line.match(ErrorStackSanitizer.SafariNativeCodeRegexp);
        });
        var stackFrames = filtered.map(function (line) {
            if (line.indexOf(' > eval') > -1) {
                line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
            }
            if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                return new StackFrame(line);
            }
            else {
                var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                var matches = line.match(functionNameRegex);
                var functionName = matches && matches[1] ? matches[1] : undefined;
                var locationParts = _this.extractLocation(line.replace(functionNameRegex, ''));
                return new StackFrame(functionName, locationParts[0], locationParts[1], locationParts[2], line);
            }
        });
        return new ParsedStack(false, stackFrames);
    };
    ErrorStackSanitizer.ChromeIEStackRegexp = /^\s*at .*(\S+:\d+|\(native\))/m;
    ErrorStackSanitizer.SafariNativeCodeRegexp = /^(eval@)?(\[native code])?$/;
    return ErrorStackSanitizer;
}());
//# sourceMappingURL=presenterviewinitializer.js.map